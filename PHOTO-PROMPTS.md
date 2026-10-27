# Photos for the Shubh Maruti site

Save each image into `assets/photos/` with the file name shown (`.jpg`, `.png` or `.webp` all work), then refresh the page. The line drawing in that spot is replaced by the photo automatically.

**Same style for every image**, so they look like one set: documentary photo, cool and muted colours, overcast or blue-hour light, realistic, **no logos, no company names, no readable text**. Add this line to the end of every prompt:

> Documentary photograph, realistic, cool muted colour palette with deep navy shadows, natural light, no logos, no brand names, no readable text.

| File name | Shape | Where it appears | Prompt |
|---|---|---|---|
| `airport-cargo` | wide (16:9) | Hero slide 1, Airport cargo service, Delhi Airport location | Air cargo pallets and containers being loaded onto a wide-body cargo aircraft at an Indian airport at dusk, ground crew in hi-vis vests on the apron |
| `road-transport` | wide (16:9) | Hero slide 2, Road transport service, "Connected by one team", Movement step | A heavy goods truck carrying a shipping container on an Indian expressway near Delhi in early morning haze, wide shot |
| `odc` | wide (16:9) | Hero slide 3, ODC service | Over-dimensional cargo: a huge industrial transformer secured on a multi-axle hydraulic low-bed trailer on an Indian highway, with an escort vehicle |
| `container-depot` | tall (4:5) | About section, Cargo handling and Container rental services, ICD Dadri and Adani ICD locations, Planning step | An inland container depot in north India: stacked shipping containers in blue, grey and rust, a reach stacker lifting a container |
| `warehouse` | wide (4:3) | About section, Warehousing service, Delivery step | Inside a clean modern warehouse in India: tall racking with palletised goods, a forklift moving a pallet, daylight from skylights |
| `seaport` | wide (16:9) | "Who we work with" band, Mundra and Nhava Sheva locations | A large container seaport on India's west coast: ship-to-shore gantry cranes loading a container ship, rows of containers, blue hour |
| `project-cargo` | wide (16:9) | Project cargo service | A large mobile crane lifting heavy industrial machinery onto a trailer at an infrastructure site in India, workers in hard hats |
| `rail-terminal` | wide (16:9) | GatewayRail location | A rail freight terminal in India: a long freight train of flat wagons carrying containers, a gantry crane over the tracks |
| `industrial-area` | wide (16:9) | Delhi NCR location | An industrial area near Gurugram: factory sheds and a loading bay with trucks being loaded with crates, late afternoon |
| `coordinator` | wide (16:9) | Enquiry step | An Indian logistics coordinator in a small office, on the phone while checking shipment details on a laptop, trucks visible through the window |

## Before publishing

- AI images are fine for this design study. On the live site, real photos of Shubh Maruti's own trucks, containers and team will build far more trust. Generated "fleet" photos could mislead clients into thinking they're real.
- If you use AI images on the live site, keep them generic (no fake company names on vehicles), and check the image tool's licence allows commercial use.
- Real photos should go through `npm run images` in the Website Development project, which resizes them and gives them one consistent colour treatment.
