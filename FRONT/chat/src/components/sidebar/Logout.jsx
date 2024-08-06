import { useState } from "react";
import { useLogout } from "../../hooks/useLogout";
import LogoutIcon from "./LogoutIcon";

const Logout = () => {

  const [loading, setLoading] = useState(false)
  const [
    logout
  ] = useLogout()

  const handleLogout = async () => {
    setLoading(true)
    await logout()
    setLoading(false)
  }

  const [showPolicy, setShowPolicy] = useState(false);


  return (
    <div className="mt-auto flex w-full px-2">
      {
        !loading ? (
          <div>
            <button
              onClick={handleLogout}
              className="flex w-full transition-colors duration-300 ease-in-out hover:text-black p-1">
              <LogoutIcon></LogoutIcon>
            </button>
          </div>
        ) : (
          <span className="loading loading-spinner"></span>
        )

      }
      <div className="flex-1">
        <button
          type="button"
          onClick={()=>setShowPolicy(state=>!state)}
          className="text-blue-500 hover:text-blue-700 cursor-pointer w-full text-right"
        >
          Privacy Policy
        </button>


      </div>
      {showPolicy && (
        <div className="absolute top-0 h-auto
                sm:w-full md:w-3/4 z-10
                bg-white border text-black border-gray-300 p-4 mt-2 rounded shadow-lg">
          <button className="w-full text-right" onClick={()=>setShowPolicy(false)}>X</button>
          <h3 className="font-bold">Privacy Policy Instachat</h3>
          <p className="text-sm">
            Welcome to Instachat, where your privacy and security are our top priorities. We are committed to safeguarding your personal information and ensuring that your messages remain confidential. Here’s how we handle your data:

          <ul>
            <li>
              <strong>1. Data Encryption:</strong> All messages exchanged through Instachat are encrypted using industry-standard encryption algorithms. This means that only you and the recipient can read your messages. Even our servers cannot decrypt the content of your communications.
            </li>
            <li>
            <strong>2. Secure Transmission:</strong> We use Transport Layer Security (TLS) to protect your data during transmission. This ensures that any information sent between your device and our servers is encrypted and protected from eavesdropping and tampering.
            </li>
            <li>
            <strong>3. Data Storage:</strong> Your messages are stored on our servers in an encrypted format. We employ robust security measures to protect this data against unauthorized access and breaches.
            </li>
            <li>
            <strong>4. Access Controls:</strong> Access to your personal data is restricted to authorized personnel only. We implement strict access controls and regular security audits to prevent unauthorized access.
            </li>
            <li>
            <strong>5. User Control:</strong> You have full control over your data. You can delete your account and all associated data at any time through the app settings.
            </li>
            <li>
            <strong>6. Policy Updates:</strong> We may update this privacy policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.
            </li>
            <li>
            <strong>7. Contact Us:</strong> If you have any questions or concerns about our privacy practices, please contact us at [support@instachat.com].
            </li>
          </ul>

            Your trust is important to us. We are committed to maintaining the highest standards of data security and privacy. Thank you for choosing Instachat.
          </p>

        </div>
      )}
    </div>
  );
};

export default Logout;
