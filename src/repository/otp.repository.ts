import OtpModel from "../schemas/otp.schema";
interface CreateOtpDTO {
  email: string;
  code: string;
}

class OtpRepository {
  async create(todo: CreateOtpDTO) {
    const addedOtp = new OtpModel(todo);
    return await addedOtp.save();
  }

  async find(email: string) {
    const addedOtp = await OtpModel.findOne({ email });
    if (!addedOtp) {
      throw new Error("code not found");
    }

    return addedOtp;
  }
}

const otpRepository = new OtpRepository();

export default otpRepository;
