import ClipLoader from "react-spinners/ClipLoader";

const cssOverride = {
    margin: "auto",
    left:0,
    right:0,
    top:0,
    bottom:0,
    position: "fixed"
};

const Loading = () => {
    return(
        <div className="loading-div">
            <ClipLoader
                className="loading"
                size={200}
                cssOverride={cssOverride}
            />
        </div>
    )
}

export default Loading;