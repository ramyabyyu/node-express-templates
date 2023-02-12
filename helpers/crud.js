const httpResponse = require("./httpResponse");
const { Types } = require("mongoose");

const getAllCommon = (Model, exclude) => async (req, res) => {
  try {
    const data = await Model.find().select(exclude).lean();
    return httpResponse.successResponse(res, data);
  } catch (error) {
    return httpResponse.serverErrorResponse(res, error.message);
  }
};

const getOneCommon = (Model, exclude) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return httpResponse.badRequestResponse(res, "Invalid id");
    }
    const data = await Model.findById(id).select(exclude).lean();
    if (!data) {
      return httpResponse.notFoundResponse(res, "Id not found");
    }
    return httpResponse.successResponse(res, data);
  } catch (error) {
    return httpResponse.serverErrorResponse(res, error.message);
  }
};

const addOneCommon = (Model) => async (req, res) => {
  try {
    const { body } = req;
    const data = await Model.create({ ...body });
    return httpResponse.createdResponse(res, data);
  } catch (error) {
    return httpResponse.badRequestResponse(res, error.message);
  }
};

const editOneCommon = (Model) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return httpResponse.badRequestResponse(res, "Invalid id");
    }
    const data = await Model.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { new: true }
    );
    if (!data) {
      return httpResponse.notFoundResponse(res, "Id not found");
    }
    return httpResponse.successResponse(res, data);
  } catch (error) {
    return httpResponse.badRequestResponse(res, error.message);
  }
};

const deleteOneCommon = (Model) => async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return httpResponse.badRequestResponse(res, "Invalid id");
    }
    const data = await Model.findByIdAndDelete(id);
    if (!data) {
      return httpResponse.notFoundResponse(res, "Id not found");
    }
    return httpResponse.successResponse(res, data);
  } catch (error) {
    return httpResponse.serverErrorResponse(res, error.message);
  }
};

const deleteAllCommon = (Model) => async (req, res) => {
  try {
    const data = await Model.deleteMany({});
    return httpResponse.successResponse(res, data);
  } catch (error) {
    return httpResponse.serverErrorResponse(res, error.message);
  }
};

module.exports = {
  getAllCommon,
  getOneCommon,
  addOneCommon,
  editOneCommon,
  deleteOneCommon,
  deleteAllCommon,
};
