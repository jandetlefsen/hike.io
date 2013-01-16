require_relative "../server"

class HikeApp < Sinatra::Base

	get "/api/v1/hikes", :provides => "json" do
		Hike.all.to_json
	end

	get "/api/v1/hikes/:hike_id", :provides => "json" do
		hike = get_hike_from_id params[:hike_id]
		hike.to_json if hike
	end

	put "/api/v1/hikes/:hike_id", :provides => "json" do
		hike = get_hike_from_id params[:hike_id]
		if hike
			hike.from_json request.body.read, :fields => ["name", "description", "locality", "distance", "elevation_gain"], :missing => :skip
			hike.save_changes
			hike.to_json
		end
	end
end