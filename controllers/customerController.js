import { sendResponse } from "../helpers/Response.js";
import Customer from "../models/customer.schema.js";

export const createCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer)
      return sendResponse(
        res,
        400,
        null,
        "Customer with this email already exists"
      );

    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
      user: req.user.id,
    });
    await newCustomer.save();
    return sendResponse(res, 201, newCustomer, "Customer added successfully");
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find({ user: req.user.id });
    return sendResponse(
      res,
      200,
      customers,
      "Fetched all customers Successfully"
    );
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!customer) return sendResponse(res, 404, null, "Customer not found");
    return sendResponse(
      res,
      200,
      customer,
      "Customer details fetched successfully"
    );
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const updatedCustomer = await Customer.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );
    if (!updatedCustomer)
      return sendResponse(res, 404, null, "Customer not found");
    return sendResponse(
      res,
      200,
      updatedCustomer,
      "Customer details updated successfully"
    );
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};

export const deleteCustomer = async (req, res) => {
  try {
    const deletedCustomer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });
    if (!deletedCustomer)
      return sendResponse(res, 404, null, "Customer not found");
    return sendResponse(res, 200, null, "Customer deleted successfully");
  } catch (err) {
    return sendResponse(res, 500, null, err.message);
  }
};
