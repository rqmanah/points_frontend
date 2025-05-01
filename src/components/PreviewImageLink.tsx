import "@fancyapps/ui/dist/fancybox/fancybox.css";
import Fancybox from "./Fancybox";

type PreviewImageLink_TP = {
  url: string;
};
export default function PreviewImageLink({ url }: PreviewImageLink_TP) {
  return (
    <div className="">
      <Fancybox
        options={{
          Carousel: {
            infinite: false,
          },
        }}
      >
        <a data-fancybox="gallery" href={url} className="">
          <div className="">
            <img
              src={url}
              alt=""
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "10px",
              }}
            />
          </div>
        </a>
      </Fancybox>
    </div>
  );
}
