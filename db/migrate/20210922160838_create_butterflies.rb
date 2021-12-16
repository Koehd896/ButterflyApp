class CreateButterflies < ActiveRecord::Migration[6.1]
  def change
    create_table :butterflies do |t|
      t.text :name
      t.text :description
      t.text :image

      t.timestamps
    end
  end
end
