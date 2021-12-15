# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Comment.destroy_all
Butterfly.destroy_all

test_butterfly = Butterfly.create(name: "Monarch", description: "The monarch butterfly or simply monarch (Danaus plexippus) is a milkweed butterfly (subfamily Danainae) in the family Nymphalidae.[4] Other common names, depending on region, include milkweed, common tiger, wanderer, and black veined brown.[5] It may be the most familiar North American butterfly, and is considered an iconic pollinator species.[6] Its wings feature an easily recognizable black, orange, and white pattern, with a wingspan of 8.9–10.2 cm (3+1⁄2–4 in)[7] A Müllerian mimic, the viceroy butterfly, is similar in color and pattern, but is markedly smaller and has an extra black stripe across each hindwing.", image: "photos/monarch.jpg")
test_butterfly_2 = Butterfly.create(name: "Swallowtail", description: "Swallowtail butterflies are large, colorful butterflies in the family Papilionidae, and include over 550 species. Though the majority are tropical, members of the family inhabit every continent except Antarctica. The family includes the largest butterflies in the world, the birdwing butterflies of the genus Ornithoptera.[1]", image:"photos/swallowtail.jpg")
