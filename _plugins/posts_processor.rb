module Jekyll
  class PostsProcessor < Generator
    safe true
    priority :lowest

    def generate(site)
      # Process markdown files in blog/posts directory
      posts_dir = File.join(site.source, 'blog', 'posts')
      return unless File.directory?(posts_dir)

      site.data['processed_posts'] = []
      
      Dir.glob(File.join(posts_dir, '*.md')).each do |file_path|
        content = File.read(file_path)
        
        # Parse frontmatter
        if content =~ /\A---\s*\n(.*?)\n---\s*\n?(.*)\z/m
          frontmatter_text = $1
          markdown_content = $2
        elsif content =~ /\A---\s*\n(.*?)\n---\s*\z/m
          # CMS format: content is in frontmatter
          frontmatter_text = $1
          markdown_content = ''
        else
          next
        end
          
          # Parse YAML frontmatter
          begin
            frontmatter = YAML.safe_load(frontmatter_text)
            
            # Check if content is in frontmatter (CMS format)
            if frontmatter && frontmatter['content']
              # Extract content from frontmatter
              cms_content = frontmatter['content']
              # Remove leading 2 spaces from each line (YAML multiline string indentation)
              lines = cms_content.split("\n")
              dedented_lines = lines.map do |line|
                if line.start_with?('  ')
                  line[2..-1]
                else
                  line
                end
              end
              markdown_content = dedented_lines.join("\n")
              frontmatter.delete('content')
            end
            
            # Only include published posts
            publish = frontmatter['publish']
            publish = true if publish.nil? # Default to true if not specified
            publish = publish.to_s.downcase == 'true' if publish.is_a?(String)
            
            next unless publish
            
            # Convert markdown to HTML using Jekyll's markdown converter
            # Create a temporary document-like object for conversion
            require 'kramdown'
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
            
            site.data['processed_posts'] << post_data
          rescue => e
            Jekyll.logger.warn "Error processing #{file_path}: #{e.message}"
            next
          end
        else
          Jekyll.logger.warn "No frontmatter found in #{file_path}"
        end
      end
      
      # Sort posts by date (newest first)
      site.data['processed_posts'].sort_by! { |p| p['date'] }.reverse!
    end
  end
end

