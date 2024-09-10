OrderProduct.delete_all
Order.delete_all
Stock.delete_all
Product.delete_all

# Ensure the Photography category exists
category = Category.find_or_create_by!(name: 'Photography')

# List of image filenames
image_filenames = Dir.entries(Rails.root.join('public', 'images')).select { |entry| entry.match?(/\.(jpg|jpeg|png)$/) }

# Define the available sizes (e.g., small, medium, large)
sizes = ['8x10', '11x14', '16x20']

# Create 5 sample products with images from public/images and add stock for each size
5.times do |i|
  product = Product.create!(
    name: "Local Photo Product #{i+1}",
    description: "Beautiful local photo #{i+1}",
    span: rand(2..6),
    category: category,
    active: true
  )

  # Randomly select 3 unique images from the local folder
  selected_images = image_filenames.sample(3)

  selected_images.each do |image_filename|
    file = Rails.root.join('public', 'images', image_filename).open
    product.images.attach(io: file, filename: image_filename)
  end

  # Create stock for each size
  sizes.each do |size|
    Stock.create!(
      product: product,
      size: size,
      price: rand(5000..15000), # Prices between 50.00 and 150.00
      amount: rand(10..50) # Random stock amount between 10 and 50
    )
  end
end

puts "5 products with multiple local images and stock for different sizes have been created!"
