# Rokka Photo Tag
#
# A Jekyll plug-in for embedding Rokka photos.
# 
# Usage: 
#   
#   {% rokka_photo aa93c7 "Alt text" %}
#
# Author: Eli Naeher
# Source: http://github.com/cnunciato/jekyll-flickr

require 'shellwords'

module Jekyll

  class RokkaPhotoTag < Liquid::Tag

    def initialize(tag_name, markup, tokens)
      super
      params = Shellwords.shellwords markup
      @photo = { :id => params[0], :caption => params[1]}
    end

    def render(context)
      organization_name = context.registers[:site].config["rokka"]["organization_name"]
      stack_name = context.registers[:site].config["rokka"]["stack_name"]

      thumbnail_url = "https://#{organization_name}.rokka.io/#{stack_name}/#{@photo[:id]}.jpg"
      thumbnail_dpr_2_url = "https://#{organization_name}.rokka.io/#{stack_name}/options-dpr-2/#{@photo[:id]}.jpg"
      thumbnail_dpr_3_url = "https://#{organization_name}.rokka.io/#{stack_name}/options-dpr-3/#{@photo[:id]}.jpg"
      full_size_url = "https://#{organization_name}.rokka.io/dynamic/#{@photo[:id]}.jpg"

      "<a class=\"thumbnail\" href=\"#{full_size_url}\"><img src=\"#{thumbnail_url}\" srcset=\"#{thumbnail_dpr_2_url} 2x, #{thumbnail_dpr_3_url} 3x\" alt=\"#{@photo[:caption]}\" title=\"#{@photo[:caption]}\"\></a>"
    end

  end
end

Liquid::Template.register_tag('rokka_photo', Jekyll::RokkaPhotoTag)
