const Title = ({ title }) => {
  return (
    <div
      className="genre"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "20px",
        paddingTop: "20px",
        borderTop: "1px solid grey",
      }}
    >
      <div>
        {title}
      </div>
    </div>
  );
};

export default Title;
