import { useEffect } from "react";

const DisplayMap = () => {
  const lat = 90.363067;
  const lon = 23.7717833;
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.barikoi.com/bkoi-gl-js/dist/bkoi-gl.js";
    script.async = true;

    script.onload = () => {
      // Initialize the map once the script is loaded
      bkoigl.accessToken =
        "bkoi_bdd09b0390d2ab71b682d438990d65bb4ae2e6a7221c300191bf5533dcb7a449"; // replace with your API key
      const map = new bkoigl.Map({
        container: "map",
        center: [lat, lon],
        zoom: 12,
      });
      map.on("load", () => {
        const marker = new bkoigl.Marker({ draggable: true })
          .setLngLat([lat, lon])
          .addTo(map);
      });
      // map.addControl(new bkoigl.ScaleControl());
      // Cleanup function
      return () => {
        map.remove(); // This will remove the map when the component is unmounted
      };
    };

    // Append the script to the document
    document.head.appendChild(script);
  }, []); // Empty dependency array ensures useEffect runs only once on mount

  return (
    <div
      id="map"
      className="rounded-2xl overflow-hidden w-[300px] h-[200px]"
      style={{ width: "300px", height: "170px", overflow: "hidden" }}
    ></div>
  );
};

export default DisplayMap;
