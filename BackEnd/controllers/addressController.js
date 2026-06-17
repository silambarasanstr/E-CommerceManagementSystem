import Address from "../models/Address.js";

// GET /api/addresses — Get all saved addresses for logged-in user
export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({ user: req.user.id }).sort({
      isDefault: -1,
      createdAt: -1,
    });

    res.status(200).json(addresses);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// POST /api/addresses — Add a new address
export const addAddress = async (req, res) => {
  const { fullName, phone, street, city, state, pincode, isDefault } = req.body;

  if (!fullName || !phone || !street || !city || !state || !pincode) {
    return res.status(400).json({ message: "All address fields are required" });
  }

  try {
    // If new address is default, remove default from existing ones
    if (isDefault) {
      await Address.updateMany(
        { user: req.user.id },
        { $set: { isDefault: false } }
      );
    }

    // First address is always default
    const count = await Address.countDocuments({ user: req.user.id });

    const address = await Address.create({
      user: req.user.id,
      fullName,
      phone,
      street,
      city,
      state,
      pincode,
      isDefault: isDefault || count === 0,
    });

    res.status(201).json({ message: "Address added successfully", address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/addresses/:id — Update an address
export const updateAddress = async (req, res) => {
  const { fullName, phone, street, city, state, pincode, isDefault } = req.body;

  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // If setting this as default, remove default from others
    if (isDefault) {
      await Address.updateMany(
        { user: req.user.id, _id: { $ne: req.params.id } },
        { $set: { isDefault: false } }
      );
    }

    address.fullName = fullName || address.fullName;
    address.phone = phone || address.phone;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.pincode = pincode || address.pincode;
    if (isDefault !== undefined) address.isDefault = isDefault;

    await address.save();

    res.status(200).json({ message: "Address updated successfully", address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE /api/addresses/:id — Delete an address
export const deleteAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const wasDefault = address.isDefault;
    await address.deleteOne();

    // If deleted address was default, make the most recent one default
    if (wasDefault) {
      const nextAddress = await Address.findOne({ user: req.user.id }).sort({
        createdAt: -1,
      });
      if (nextAddress) {
        nextAddress.isDefault = true;
        await nextAddress.save();
      }
    }

    res.status(200).json({ message: "Address deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// PUT /api/addresses/:id/set-default — Set an address as default
export const setDefaultAddress = async (req, res) => {
  try {
    const address = await Address.findById(req.params.id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    if (address.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Address.updateMany(
      { user: req.user.id },
      { $set: { isDefault: false } }
    );

    address.isDefault = true;
    await address.save();

    res.status(200).json({ message: "Default address updated", address });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
