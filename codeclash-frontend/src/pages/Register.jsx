import {
  Form,
  Input,
  Select,
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
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import bg from "../assets/prizes/bg.png";


/* ── Canvas glitter particles ── */
const GlitterCanvas = () => {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const COUNT = 120;
    const particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.5 + 0.3,
      alpha: Math.random(),
      speed: Math.random() * 0.004 + 0.002,
      phase: Math.random() * Math.PI * 2,
      hue: Math.random() > 0.5 ? "0,255,194" : "168,85,247",
    }));
    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        const a = 0.15 + 0.6 * Math.abs(Math.sin(p.phase + t * p.speed));
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.hue},${a})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
};

export default function Register() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const selectedClass = Form.useWatch("standard", form);
  const screenshotFiles = Form.useWatch("screenshot", form);

  const normFile = (e) => {
    if (Array.isArray(e)) return e;
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

  const trackOptions = allowedTracks.map((track) => ({
    value: track.value,
    title: track.value,
    label: (
      <div className="flex flex-col">
        <div className="font-medium">{track.value}</div>
        <div className="text-xs font-extralight">{track.eligiblity}</div>
      </div>
    ),
  }));

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = ({ type, content }, pauseOnHover) => {
    const key = `open${Date.now()}`;
    api[type]({
      message: content,
      placement: "topRight",
      showProgress: true,
      key,
      pauseOnHover,
      onClose: () => type === "success" && navigate("/"),
    });
  };

  return (
    <div
      className="relative flex min-h-dvh flex-col items-center justify-center gap-10"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "fixed", inset: 0,
          background: "linear-gradient(135deg,rgba(2,13,20,0.82) 0%,rgba(5,13,26,0.78) 30%,rgba(12,8,24,0.80) 60%,rgba(8,9,9,0.85) 100%)",
          zIndex: 0, pointerEvents: "none",
        }}
      />

      {/* Radial glows */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 60% 40% at 5% 20%,rgba(0,255,194,0.07) 0%,transparent 70%), radial-gradient(ellipse 50% 40% at 95% 80%,rgba(168,85,247,0.08) 0%,transparent 70%)",
        }}
      />

      <GlitterCanvas />
      {contextHolder}

      {/* Page title */}
      <h1
        className="relative font-mono text-3xl font-bold sm:text-4xl sm:tracking-[5px]"
        style={{
          zIndex: 1, marginTop: "6rem",
          backgroundImage: "linear-gradient(to right, #00FFC2, #a855f7)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
        }}
      >
        &lt;/MGM CodeClash&gt;
      </h1>

      {/* Glass form card */}
      <div
        className="relative container mx-auto mb-10 w-11/12 rounded-3xl p-8 sm:w-3/4 md:w-3/5 lg:w-1/2 xl:w-2/5 2xl:w-1/3"
        style={{
          zIndex: 1,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(0,255,194,0.25)",
          boxShadow: "0 0 40px rgba(0,255,194,0.06), inset 0 0 0 0.5px rgba(0,255,194,0.1)",
        }}
      >
        {/* Corner accents */}
        <span style={{ position: "absolute", top: "14px", left: "14px", width: "20px", height: "20px", borderTop: "1.5px solid rgba(0,255,194,0.5)", borderLeft: "1.5px solid rgba(0,255,194,0.5)", borderRadius: "4px 0 0 0" }} />
        <span style={{ position: "absolute", bottom: "14px", right: "14px", width: "20px", height: "20px", borderBottom: "1.5px solid rgba(168,85,247,0.5)", borderRight: "1.5px solid rgba(168,85,247,0.5)", borderRadius: "0 0 4px 0" }} />

        {/* Kickr notice */}
        <div className="mb-5 space-y-2 rounded-xl p-4 text-center" style={{ background: "rgba(0,0,0,0.35)", border: "1px solid rgba(0,255,194,0.12)" }}>
          <p className="text-sm font-medium sm:text-base" style={{ color: "rgb(0,255,194)" }}>
            ⚠️ Before submitting, please fill out the Hackathon form at{" "}
            <a href="https://www.kickrcodemania.com/" target="_blank" rel="noreferrer" className="underline" style={{ color: "rgb(0,255,194)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgb(0,255,194)")}
            >
              www.kickrcodemania.com
            </a>
          </p>
          <p className="text-xs text-white/70 sm:text-sm">
            Attach a screenshot confirming your Kickr registration below.
          </p>
        </div>

        {/* Global style overrides for InputNumber addon and white backgrounds */}
        <style>{`
          .register-form .ant-input-number-group-addon {
            background: rgba(0, 255, 194, 0.08) !important;
            border-color: rgba(0, 255, 194, 0.2) !important;
            color: rgb(0, 255, 194) !important;
          }
          .register-form .ant-input-number {
            background: rgba(255,255,255,0.07) !important;
            border-color: rgba(0, 255, 194, 0.2) !important;
          }
          .register-form .ant-input-number input {
            background: transparent !important;
            color: #ffffff !important;
          }
          .register-form .ant-input-number-group-wrapper {
            background: transparent !important;
          }
          .register-form .ant-input-number-wrapper {
            background: transparent !important;
          }
          .register-form .ant-input {
            background: rgba(255,255,255,0.07) !important;
            border-color: rgba(0, 255, 194, 0.2) !important;
            color: #ffffff !important;
          }
          .register-form .ant-select-selector {
            background: rgba(255,255,255,0.07) !important;
            border-color: rgba(0, 255, 194, 0.2) !important;
            color: #ffffff !important;
          }
          .register-form .ant-form-item-label > label {
            color: #ffffff !important;
          }
          .register-form .ant-input:hover,
          .register-form .ant-input-number:hover {
            border-color: rgba(0, 255, 194, 0.6) !important;
          }
          .register-form .ant-input:focus,
          .register-form .ant-input-number-focused {
            border-color: rgb(0, 255, 194) !important;
            box-shadow: 0 0 0 2px rgba(0, 255, 194, 0.1) !important;
          }
          .register-form .ant-upload {
            background: rgba(255,255,255,0.07) !important;
            border-color: rgba(0, 255, 194, 0.2) !important;
          }
        `}</style>

        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#00FFC2",
              colorTextPlaceholder: "#6b7280",
              colorBgElevated: "#0d1117",
              colorText: "#ffffff",
            },
            components: {
              Select: {
                optionSelectedBg: "rgba(0,255,194,0.15)",
              },
            },
          }}
        >
          <Form
            form={form}
            name="wrap"
            layout="vertical"
            colon={false}
            className="register-form flex flex-col justify-between text-white"
            requiredMark={(label, info) => (
              <div>
                <span className="text-white">{label}</span>{" "}
                {info.required ? <span className="text-red-500">*</span> : ""}
              </div>
            )}
            onFinish={async (value) => {
              setLoading(true);
              try {
                const formattedData = formatFormData({ data: value });
                if (value.screenshot && value.screenshot.length > 0) {
                  const file = value.screenshot[0].originFileObj;
                  const formData = new FormData();
                  formData.append("file", file);
                  formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || "your_preset_here");
                  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || "your_cloud_name_here";
                  const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, { method: "POST", body: formData });
                  if (!uploadRes.ok) throw new Error("Failed to upload image");
                  const uploadedImageData = await uploadRes.json();
                  formattedData.screenshotUrl = uploadedImageData.secure_url;
                }
                registerParticipant({ formData: formattedData, openNotificationWithIcon, formInstance: form, setLoading });
              } catch (error) {
                openNotificationWithIcon({ type: "error", content: "Error processing file upload" });
                setLoading(false);
              }
            }}
            autoComplete="off"
          >
            {/* First / Last Name */}
            <div className="flex w-full flex-col justify-between sm:flex-row sm:gap-6">
              <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Name is required", whitespace: true }]} validateDebounce={500} className="w-full sm:w-1/2">
                <Input className="w-full text-base" placeholder="First Name" />
              </Form.Item>
              <Form.Item label="Last Name" name="lastName" className="w-full sm:w-1/2">
                <Input className="w-full text-base" placeholder="Last Name" />
              </Form.Item>
            </div>

            {/* Phone / Email */}
            <div className="flex w-full flex-col justify-between sm:flex-row sm:gap-6">
              <Form.Item label="Phone" name="phone" rules={[{ validator: validatePhone, required: true }]} validateDebounce={500} className="w-full sm:w-1/2">
                <InputNumber
                  addonBefore="+91"
                  className="w-full text-base"
                  placeholder="10 digit phone number"
                  controls={false}
                />
              </Form.Item>
              <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required", type: "email" }]} validateDebounce={500} className="w-full sm:w-1/2">
                <Input className="w-full text-base" placeholder="Email" />
              </Form.Item>
            </div>

            {/* Class / Roll */}
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-6">
              <Form.Item label="Class" name="standard" rules={[{ required: true, message: "Class is required" }]} validateDebounce={500} initialValue={null} className="w-full sm:w-1/2">
                <Select options={CLASSES} className="text-base" placeholder="Select Class" onChange={() => form.setFieldValue("division", null)} />
              </Form.Item>
              <Form.Item label="University Roll No." name="university_roll_number" rules={[{ required: true }]} validateDebounce={500} className="w-full sm:w-1/2">
                <InputNumber className="w-full text-base" placeholder="University Roll number" controls={false} />
              </Form.Item>
            </div>

            {/* Username / Track */}
            <div className="flex w-full flex-col items-end justify-between sm:flex-row sm:gap-6">
              <Form.Item label="Username" name="hackerrank_username" rules={[{ required: true, message: "Hackerrank username is required", whitespace: true }]} validateDebounce={500} className="w-full sm:w-1/2">
                <Input className="w-full text-base" placeholder="Hackerrank Username" />
              </Form.Item>
              <Form.Item
                label="Track" name="division"
                rules={[{ required: true, validator: (_, value) => value && value !== "" ? Promise.resolve() : Promise.reject("Track is required") }]}
                validateDebounce={500} initialValue={null} className="w-full sm:w-1/2"
              >
                <Select options={trackOptions} className="w-full text-base" placeholder="Select Track" onChange={() => form.validateFields(["division"])} optionLabelProp="title" />
              </Form.Item>
            </div>

            {/* Screenshot upload */}
            <div className="mt-4 w-full">
              <div className="text-base text-white">
                Kickr Tech. Screenshot <span className="text-red-500">*</span>
              </div>
              <div className="flex items-center gap-4 -mt-1">
                <Form.Item name="screenshot" valuePropName="fileList" getValueFromEvent={normFile} rules={[{ required: true, message: "Please upload screenshot" }]} className="mb-0">
                  <Upload name="screenshot" listType="picture-card" showUploadList={false} beforeUpload={() => false} maxCount={1} accept="image/*" className="mt-2 [&_.ant-upload]:!h-[100px] [&_.ant-upload]:!w-[100px]">
                    {screenshotFiles && screenshotFiles.length > 0 ? (
                      <img src={URL.createObjectURL(screenshotFiles[0].originFileObj)} alt="screenshot" className="h-full w-full object-cover p-2" />
                    ) : (
                      <div className="flex flex-col items-center justify-center" style={{ color: "rgba(255,255,255,0.6)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "rgb(0,255,194)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                      >
                        <span className="text-2xl">+</span>
                        <div className="mt-1 font-mono text-xs">Upload</div>
                      </div>
                    )}
                  </Upload>
                </Form.Item>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-5 flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="rounded-full px-14 py-3 font-mono font-bold text-black sm:mt-2 md:text-xl"
                style={{
                  background: loading ? "rgba(0,255,194,0.5)" : "linear-gradient(to right, #00FFC2, #a855f7)",
                  border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  fontSize: "1rem", fontWeight: "700", letterSpacing: "0.02em", transition: "opacity 0.2s ease",
                }}
                onMouseEnter={(e) => !loading && (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </Form>
        </ConfigProvider>
      </div>
    </div>
  );
}