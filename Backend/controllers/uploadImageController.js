import uploadImageCloud from "../utils/uploadImageCloud.js";        

const uploadImageController = async (req, res) => {
  try {
    const file = req.file;
    const uploadImage = await uploadImageCloud(file);

    return res.json({
      message: "Upload Done",
      data: uploadImage,
      success: true,
      error: false,
    });
  } catch (error) {
    return res.json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
};

export default uploadImageController;
