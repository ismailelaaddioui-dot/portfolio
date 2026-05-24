#!/bin/bash

# Create placeholder images using ImageMagick
# This creates simple gradient placeholders for preview purposes

cd /home/claude/ismail-portfolio/public/images

# Homepage
convert -size 800x900 gradient:#8B7355-#D4A373 hero-1.jpg
convert -size 900x1000 gradient:#2C3E50-#34495E hero-2.jpg

# Gallery
convert -size 600x750 gradient:#C9ADA7-#9A8C98 gallery-1.jpg
convert -size 600x800 gradient:#4A5859-#6C7A89 gallery-2.jpg
convert -size 600x600 gradient:#E8DED2-#D6CCC2 gallery-3.jpg
convert -size 600x750 gradient:#A8DADC-#457B9D gallery-4.jpg
convert -size 750x600 gradient:#F1FAEE-#A8DADC gallery-5.jpg
convert -size 600x800 gradient:#8B7355-#6C584C gallery-6.jpg

# Commission
convert -size 700x900 gradient:#D4A373-#8B7355 commission-1.jpg
convert -size 700x900 gradient:#6C7A89-#4A5859 commission-2.jpg

# Personal Works
convert -size 600x750 gradient:#F4A261-#E76F51 personal-1.jpg
convert -size 600x800 gradient:#264653-#2A9D8F personal-2.jpg
convert -size 750x600 gradient:#E9C46A-#F4A261 personal-3.jpg
convert -size 600x600 gradient:#457B9D-#1D3557 personal-4.jpg

# About
convert -size 500x700 gradient:#8B7355-#6C584C about-portrait.jpg

# Book
convert -size 600x840 gradient:#2C3E50-#34495E book-cover.jpg
convert -size 600x750 gradient:#E8DED2-#D6CCC2 book-preview-1.jpg
convert -size 600x750 gradient:#C9ADA7-#9A8C98 book-preview-2.jpg
convert -size 600x750 gradient:#8B7355-#D4A373 book-preview-3.jpg

echo "Placeholder images created successfully!"
