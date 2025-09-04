#!/bin/bash

# Fix all absolute URLs to relative URLs for GitHub Pages

# Fix JavaScript file URLs
echo "Fixing JavaScript URLs..."
sed -i '' "s|url: '/|url: '|g" js/script.js

# Fix HTML navigation links
echo "Fixing HTML navigation links..."
for file in *.html; do
    if [ -f "$file" ]; then
        echo "Processing: $file"
        # Fix navigation menu links
        sed -i '' 's|href="/index.html"|href="index.html"|g' "$file"
        sed -i '' 's|href="/"|href="index.html"|g' "$file"
        sed -i '' 's|href="/about.html"|href="about.html"|g' "$file"
        sed -i '' 's|href="/contact.html"|href="contact.html"|g' "$file"
        sed -i '' 's|href="/privacy.html"|href="privacy.html"|g' "$file"
        sed -i '' 's|href="/terms.html"|href="terms.html"|g' "$file"
        sed -i '' 's|href="/disclaimer.html"|href="disclaimer.html"|g' "$file"
        sed -i '' 's|href="/author.html"|href="author.html"|g' "$file"
        sed -i '' 's|href="/editorial-policy.html"|href="editorial-policy.html"|g' "$file"
        
        # Fix category links
        sed -i '' 's|href="/category-stock.html"|href="category-stock.html"|g' "$file"
        sed -i '' 's|href="/category-economy.html"|href="category-economy.html"|g' "$file"
        sed -i '' 's|href="/category-crypto.html"|href="category-crypto.html"|g' "$file"
        
        # Fix CSS and JS links
        sed -i '' 's|href="/css/style.css"|href="css/style.css"|g' "$file"
        sed -i '' 's|src="/js/script.js"|src="js/script.js"|g' "$file"
    fi
done

echo "URL fixes complete!"