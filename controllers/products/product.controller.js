import productModel from '../../models/products/product.model.js';
export const createProduct = async (req, res) => {
    try {
      const { name, description, price, category, stock } = req.body;
  
      if (!name || !description || !price || !category || !stock) {
        return res.status(400).json({
          success: false,
          message: 'All fields are required.',
        });
      }
  
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
  
      const product = new productModel({
        name,
        description,
        price,
        category,
        stock,
        images: imageUrl ? [imageUrl] : []
      });
  
      const savedProduct = await product.save();
  
      res.status(201).json({
        success: true,
        message: 'Product created successfully',
        product: savedProduct,
      });
    } catch (err) {
      console.error('Error creating product:', err);
      res.status(500).json({
        success: false,
        message: 'Server error while creating product',
        error: err.message,
      });
    }
  };
  

export const getAllProducts = async (req, res) => {
  try {
    // Fetch all products
    const products = await productModel.find({});

    // Check if there are no products
    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: 'No products found',
      });
    }

    // Respond with the products
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching products',
      error: error.message,
    });
  }
};
