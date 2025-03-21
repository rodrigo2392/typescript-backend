import OtpRepository from "../repository/otp.repository";
import { encrypt } from "../utils/encrypt";
import EmailService from "./email.service";

class OtpService {
  async get(email: string) {
    return OtpRepository.find(email);
  }
  generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
  }
  async create(email: string) {
    try {
      const code = this.generateOTP();

      const encryptedCode = await encrypt(code.toString());

      await OtpRepository.create({
        email,
        code: encryptedCode,
      });
      const body = `Este es tu código de verificación: <strong>${code}</strong>`;
      await EmailService.sendEmail(email, body);
    } catch (err) {
      throw new Error(err as string);
    }
  }
}

const otpService = new OtpService();

export default otpService;
