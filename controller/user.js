exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};


exports.operatorRumahBoard = (req, res) => {
  res.status(200).send("Operator Perumahan Content.");
};


exports.operatorTamanBoard = (req, res) => {
  res.status(200).send("Operator Pertamanan Content.");
};


exports.operatorPemukimanBoard = (req, res) => {
  res.status(200).send("Operator Pemukiman Content.");
};

