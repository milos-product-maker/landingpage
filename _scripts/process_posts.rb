#!/usr/bin/env ruby
# Script to process blog posts and generate JSON data file
# This runs before Jekyll builds on GitHub Pages

require 'yaml'
require 'json'
require 'fileutils'

# Load kramdown for markdown conversion
# This should be available via bundler in GitHub Actions
begin
  require 'kramdown'
rescue LoadError
  begin
    require 'bundler/setup'
    require 'kramdown'
  rescue LoadError => e
    $stderr.puts "Error: kramdown gem not found. Please run 'bundle install' first."
    $stderr.puts e.message
    exit 1
  end
end

posts_dir = File.join(__dir__, '..', 'blog', 'posts')
data_dir = File.join(__dir__, '..', '_data')
FileUtils.mkdir_p(data_dir)

processed_posts = []

Dir.glob(File.join(posts_dir, '*.md')).each do |file_path|
  content = File.read(file_path, encoding: 'UTF-8')
  
  # Parse frontmatter
  if content =~ /\A---\s*\n(.*?)\n---\s*\n(.*)\z/m
    # Old format: content after frontmatter
    frontmatter_text = $1
    markdown_content = $2
  elsif content =~ /\A---\s*\n(.*?)\n---\s*\z/m
    # CMS format: content is in frontmatter, no content after
    frontmatter_text = $1
    markdown_content = ''
  else
    puts "Warning: No frontmatter found in #{file_path}"
    next
  end
  
  begin
    frontmatter = YAML.safe_load(frontmatter_text)
    
    if frontmatter.nil?
      puts "Warning: Failed to parse YAML in #{file_path}"
      next
    end
    
    # Check if content is in frontmatter (CMS format)
    if frontmatter['content']
      # Extract content from frontmatter
      cms_content = frontmatter['content']
      # Remove leading 2 spaces from each line (YAML multiline string indentation)
      lines = cms_content.split("\n")
      dedented_lines = lines.map do |line|
        if line.start_with?('  ')
          line[2..-1]
        elsif line.strip.empty?
          ''
        else
          line
        end
      end
      markdown_content = dedented_lines.join("\n")
      frontmatter.delete('content')
    end
    
    # Only include published posts (default to true if not specified)
    publish = frontmatter['publish']
    if publish.nil?
      publish = true  # Default to published
    elsif publish.is_a?(String)
      publish = publish.downcase == 'true'
    end
    
    unless publish
      puts "Skipping unpublished post: #{file_path}"
      next
    end
    
    # Ensure we have content to convert
    if markdown_content.nil? || markdown_content.strip.empty?
      puts "Warning: No content found in #{file_path}"
      next
    end
    
    # Convert markdown to HTML using kramdown
    html_content = Kramdown::Document.new(markdown_content, input: 'GFM', hard_wrap: false, auto_ids: true).to_html
    
    # Ensure tags is an array
    tags = frontmatter['tags']
    tags = [tags] unless tags.is_a?(Array)
    
    post_data = {
      'title' => frontmatter['title'] || '',
      'slug' => frontmatter['slug'] || File.basename(file_path, '.md'),
      'date' => frontmatter['date'] || '',
      'author' => frontmatter['author'] || '',
      'tags' => tags || [],
      'image' => frontmatter['image'] || '',
      'description' => frontmatter['description'] || '',
      'content' => html_content
    }
    
    processed_posts << post_data
    puts "Processed: #{post_data['title']} (#{post_data['slug']})"
  rescue => e
    puts "Error processing #{file_path}: #{e.message}"
    puts e.backtrace.first(3).join("\n")
  end
end

# Sort posts by date (newest first)
processed_posts.sort_by! { |p| p['date'] }.reverse!

# Write to JSON file that Jekyll can read
# Jekyll expects data files to be YAML or JSON
output_file = File.join(data_dir, 'processed_posts.json')
File.write(output_file, JSON.pretty_generate(processed_posts))

puts "\nProcessed #{processed_posts.length} posts"
puts "Output written to #{output_file}"

