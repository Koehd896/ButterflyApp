class CreateButterflies < ActiveRecord::Migration[6.1]
  def change
    create_table :butterflies do |t|
      t.string :name
      t.string :description
      t.string :image

      t.timestamps
    end
  end
end
