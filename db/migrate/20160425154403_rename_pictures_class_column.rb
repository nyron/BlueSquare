class RenamePicturesClassColumn < ActiveRecord::Migration
  def change
    rename_column :pictures, :class, :rank
  end
end
