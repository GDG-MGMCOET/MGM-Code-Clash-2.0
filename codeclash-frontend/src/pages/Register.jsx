import {
  Form,
  Input,
  Select,
  Button,
  message,
  InputNumber,
  ConfigProvider,
  notification,
  Upload,
} from "antd";
import {
  CLASSES,
  formatFormData,
  registerParticipant,
  validatePhone,
} from "../utils";
import { TRACK_OPTIONS } from "../utils/constant";
import { useState } from "react";
import Icon from "@mdi/react";
import { mdiLinkVariant } from "@mdi/js";
import { useNavigate } from "react-router";

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectedClass = Form.useWatch("standard", form);
  const screenshotFiles = Form.useWatch("screenshot", form);

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  let allowedTracks = TRACK_OPTIONS;
  if (selectedClass) {
    const classLower = selectedClass.toLowerCase();
    const isFirstOrSecondYear =
      classLower.startsWith("ft") || classLower.startsWith("st");
    if (!isFirstOrSecondYear) {
      allowedTracks = TRACK_OPTIONS.filter((track) => track.value === "Pro Track");
    }
  }

  const trackOptions = [
    ...allowedTracks.map((track) => {
      return {
        value: track.value,
        title: track.value,
        label: (
          <div className="flex flex-col">
            <div className="font-medium">{track.value}</div>
            <div className="text-xs font-extralight">{track.eligiblity}</div>
          </div>
        ),
      };
    }),
  ];

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = ({ type, content }, pauseOnHover) => {
    const key = `open${Date.now()}`;

    api[type]({
      message: content,
      placement: "topRight",
      showProgress: true,
      key,
      pauseOnHover,
      // Only navigate home after closing a SUCCESS notification
      onClose: () => type === "success" && navigate("/"),
    });
  };

  return (
    <div
      className="flex min-h-dvh flex-col items-center justify-center gap-10 bg-cover bg-center"
      style={{ backgroundImage: "url('/hero.webp')" }}
    >
      {contextHolder}
      <h1 className="mt-24 font-mono text-3xl font-bold text-accent sm:mt-0 sm:text-4xl sm:tracking-[5px]">
        &lt;/MGM CodeClash&gt;
      </h1>

      <div className="container mx-auto mb-10 w-3/4 rounded-3xl border-4 border-accent p-12 backdrop-blur-md md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3">
        <div className="mb-3 text-center space-y-2 rounded-xl bg-black/40 p-4">
          <p className="text-sm font-medium text-accent sm:text-base">
            ⚠️ Requirement: Before submitting, please fill out the Hackathon form at{" "}
            <a href="https://www.kickrcodemania.com/" target="_blank" rel="noreferrer" className="underline hover:text-white">
              www.kickrcodemania.com
            </a>
          </p>
          <p className="text-xs text-white/80 sm:text-sm">
            You must attach a screenshot confirming your Kickr registration below.
          </p>
        </div>
        <ConfigProvider
          theme={{
            components: {
              InputNumber: {
                addonBg: "#ffffff",
              },
            },
            token: {
              colorPrimary: "#FFC854",
              colorTextPlaceholder: "#a3a3a3",
            },
          }}
        >
          <Form
            form={form}
            name="wrap"
            layout="vertical"
            colon={false}
            className="flex flex-col justify-between text-white"
            requiredMark={(label, info) => {
              return (
                <div>
                  <span className="text-white">{label}</span>{" "}
                  {info.required ? <span className="text-red-600">*</span> : ""}
                </div>
              );
            }}
            onFinish={async (value) => {
              setLoading(true);
              try {
                const formattedData = formatFormData({ data: value });

                // Upload file to Cloudinary
                if (value.screenshot && value.screenshot.length > 0) {
                  const file = value.screenshot[0].originFileObj;
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your_preset_here");

                  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_cloud_name_here";
                  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: "POST",
                    body: formData,
                  });

                  if (!uploadRes.ok) {
                    throw new Error("Failed to upload image to Cloudinary");
                  }

                  const uploadedImageData = await uploadRes.json();
                  formattedData.screenshotUrl = uploadedImageData.secure_url;
                }

                registerParticipant({
                  formData: formattedData,
                  openNotificationWithIcon,
                  formInstance: form,
                  setLoading,
                });
              } catch (error) {
                openNotificationWithIcon({ type: "error", content: "Error processing file upload" });
                setLoading(false);
              }
            }}
            autoComplete="off"
          >

            <div className="flex w-full flex-col justify-between sm:flex-row sm:gap-10">
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[
                  {
                    required: true,
                    message: "Name is required",
                    whitespace: true,
                  },
                ]}
                validateDebounce={500}
                className="w-full sm:w-1/2"
              >
                <Input className="w-full text-base" placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name="lastName"
                className="w-full sm:w-1/2"
              >
                <Input className="w-full text-base" placeholder="Last Name" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col justify-between sm:flex-row sm:gap-10">
              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ validator: validatePhone, required: true }]}
                validateDebounce={500}
                className="w-full sm:w-1/2"
              >
                <InputNumber
                  addonBefore="+91"
                  className="w-full text-base"
                  placeholder="10 digit phone number"
                  controls={false}
                />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Email is required",
                    type: "email",
                  },
                ]}
                validateDebounce={500}
                className="w-full sm:w-1/2"
              >
                <Input className="w-full text-base" placeholder="Email" />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-10">
              <Form.Item
                label="Class"
                name="standard"
                rules={[
                  {
                    required: true,
                    message: "Class is required",
                  },
                ]}
                validateDebounce={500}
                initialValue={null}
                className="w-full sm:w-1/2"
              >
                <Select
                  options={CLASSES}
                  className="text-base"
                  placeholder="Select Class"
                  onChange={() => form.setFieldValue("division", null)}
                />
              </Form.Item>
              <Form.Item
                label="Class Roll no."
                name="class_roll_number"
                rules={[
                  {
                    required: true,
                  },
                ]}
                validateDebounce={500}
                className="w-full sm:w-1/2"
              >
                <InputNumber
                  className="w-full text-base"
                  placeholder="Class Roll number"
                  controls={false}
                />
              </Form.Item>
            </div>
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-10">
              <Form.Item
                label="Username"
                name="hackerrank_username"
                rules={[
                  {
                    required: true,
                    message: "Hackerrank username is required",
                    whitespace: true,
                  },
                ]}
                validateDebounce={500}
                className="w-full sm:w-1/2"
              >
                <Input
                  className="w-full text-base"
                  placeholder="Hackerrank Username"
                />
              </Form.Item>
              <Form.Item
                label="Track"
                name="division"
                rules={[
                  {
                    required: true,
                    validator: (_, value) =>
                      value && value !== ""
                        ? Promise.resolve()
                        : Promise.reject("Track is required"),
                  },
                ]}
                validateDebounce={500}
                initialValue={null}
                className="w-full sm:w-1/2"
              >
                <Select
                  options={trackOptions}
                  className="w-full text-base"
                  placeholder="Select Track"
                  onChange={() => form.validateFields(["division"])}
                  optionLabelProp="title"
                />
              </Form.Item>
            </div>
            <div className="mt-4 w-full  ">
              <div className="text-base text-white">
                Kickr Tech. Screenshot{" "}
                <span className="text-red-600">*</span>
              </div>
              <div className="flex items-center gap-4 -mt-1">
                <Form.Item
                  name="screenshot"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                  rules={[{ required: true, message: "Please upload screenshot" }]}
                  className="mb-0" // remove bottom margin since we want it aligned perfectly
                >
                  <Upload
                    name="screenshot"
                    listType="picture-card"
                    showUploadList={false} // hide default file row
                    beforeUpload={() => false}
                    maxCount={1}
                    accept="image/*"
                    className="mt-2 [&_.ant-upload]:!h-[100px] [&_.ant-upload]:!w-[100px]"
                  >
                    {screenshotFiles && screenshotFiles.length > 0 ? (
                      <img
                        src={URL.createObjectURL(screenshotFiles[0].originFileObj)}
                        alt="screenshot"
                        className="h-full w-full object-cover p-2"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-white/80 hover:text-accent">
                        <span className="text-2xl">+</span>
                        <div className="mt-1 font-mono text-xs">Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>


              </div>
            </div>


            <ConfigProvider
              theme={{
                token: { colorPrimary: "#FFC854" },
                components: { Button: { defaultHoverBg: "#000" } },
              }}
            >
              <Button
                htmlType="submit"
                className="mt-3 self-center rounded-full border-none bg-accent px-12 py-6 font-mono font-bold text-black sm:mt-5 md:text-xl"
                /*className="mt-2 self-center rounded-full border-none bg-accent px-12 py-6 font-mono font-bold text-black md:text-xl" */
                loading={loading}
              >
                Register
              </Button>
            </ConfigProvider>
            {/* <a
              href="https://www.hackerrank.com/auth/signup"
              className="mt-7 flex items-center gap-2 self-center text-xs text-accent sm:text-sm"
              target="_blank"
              rel="noreferrer"
            >
              Don't have a Hackerrank account?
              <Icon path={mdiLinkVariant} size={0.6} />
            </a> */}
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}
