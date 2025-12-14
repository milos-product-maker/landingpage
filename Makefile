.PHONY: fetch-main merge-main push-main publish serve

# Fetch latest changes from main branch
fetch-main:
	@echo "Fetching latest from main..."
	git fetch origin main

# Merge main into current branch
merge-main:
	@echo "Merging main into current branch..."
	git merge origin/main || true

# Push current branch to main
push-main:
	@echo "Pushing current branch to main..."
	git push origin HEAD:main

# Combined command: fetch from main, merge, and push to main
# Note: Jekyll processes posts automatically on GitHub Pages - no update step needed!
publish: fetch-main merge-main push-main
	@echo "Publish workflow completed! GitHub Pages will build automatically."

# Process blog posts before serving
process-posts:
	@echo "Processing blog posts..."
	bundle exec ruby _scripts/process_posts.rb

# Serve Jekyll site locally for testing
serve: process-posts
	@echo "Starting Jekyll server..."
	bundle exec jekyll serve

