import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

import api from "../../services/api";

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.login(email, password);

      toast.success(response.message || "Login successful");

      // Store user
      if (response.user) {
        localStorage.setItem("user", JSON.stringify(response.user));
      }

      const role = response.user?.role || "user";

      if (role === "admin") {
        navigate("/admin-dashboard");
      } else if (role === "agent") {
        navigate("/agent-dashboard");
      } else {
        navigate("/user-dashboard");
      }
    } catch (err) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };


  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    padding: "20px",
  };

  const cardStyle = {
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    padding: "40px",
    maxWidth: "450px",
    width: "100%",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: "8px",
    textAlign: "center",
  };

  const subtitleStyle = {
    fontSize: "14px",
    color: "#7f8c8d",
    textAlign: "center",
    marginBottom: "32px",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  };

  const inputContainerStyle = {
    display: "flex",
    flexDirection: "column",
  };

  const labelStyle = {
    fontSize: "13px",
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: "6px",
  };

  const inputStyle = {
    padding: "10px 12px",
    border: "1px solid #bdc3c7",
    borderRadius: "6px",
    fontSize: "14px",
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
  };

  const submitStyle = {
    backgroundColor: "#3498db",
    color: "#fff",
    padding: "12px",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "8px",
    transition: "all 0.3s",
  };

  const linkStyle = {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "14px",
    color: "#7f8c8d",
  };

  const linkButtonStyle = {
    color: "#3498db",
    textDecoration: "none",
    cursor: "pointer",
    fontWeight: "600",
    background: "none",
    border: "none",
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subtitleStyle}>Sign in to your account</p>
        <form onSubmit={handleSubmit} style={formStyle}>
          <div style={inputContainerStyle}>
            <label style={labelStyle}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={inputStyle}
              placeholder="you@example.com"
              onFocus={(e) => (e.target.style.borderColor = "#3498db")}
              onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
              required
            />
          </div>

         <div style={inputContainerStyle}>
  <label style={labelStyle}>Password</label>

  <div style={{ position: "relative", width: "100%" }}>
    <input
      type={showPassword ? "text" : "password"}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="••••••••"
      required
      style={{
        ...inputStyle,
        width: "100%",
        paddingRight: "48px", // space for eye icon
      }}
      onFocus={(e) => (e.target.style.borderColor = "#3498db")}
      onBlur={(e) => (e.target.style.borderColor = "#bdc3c7")}
    />

    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      style={{
        position: "absolute",
        right: "14px",
        top: "50%",
        transform: "translateY(-50%)",
        background: "transparent",
        border: "none",
        padding: 0,
        margin: 0,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#7f8c8d",
        height: "100%", // key for centering
      }}
    >
      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
</div>



          <button
            type="submit"
            style={submitStyle}
            disabled={loading}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#2980b9")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.backgroundColor = "#3498db")
            }
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={linkStyle}>
          Don't have an account?{" "}
          <button style={linkButtonStyle} onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
