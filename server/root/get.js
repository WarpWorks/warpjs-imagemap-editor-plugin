module.exports = (req, res) => {
    console.log("GET body=", req.body);

    res.status(204).send();
};
