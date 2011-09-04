# site.years = 2001=>[1=>[post1, post2...], 2=>[...]], 2002=>[...]

class Jekyll::Site
	alias :site_payload_without_tiered_archives :site_payload
	
	def site_payload
		data = site_payload_without_tiered_archives
		data['site']['years'] = TieredArchives::find_years(self.posts.reverse)
		data
	end
end

module TieredArchives
  
        def self.find_years(posts)
          posts.group_by {|post| post.date.year}.values.map {|year| year.group_by {|post| post.date.month}.values}; 
        end

end
