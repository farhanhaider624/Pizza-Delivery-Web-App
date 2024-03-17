const Count = require("../Models/Count");


module.exports.addCount=async(req,res)=>{
    {
        try {
          const updatedCount = await Count.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true });
          res.json({ count: updatedCount.count });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      }
}

module.exports.updateCount=async(req,res)=>{
    {
        try {
          const updatedCount = await Count.findOneAndUpdate({}, { count: req.body.count }, { new: true });
          res.json({ count: updatedCount.count });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: "An error occurred" });
        }
      }
}

module.exports.getCount=async(req,res)=>{
    {
        try {
          const count = await Count.findOne();
          res.json({ count: count.count });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        }
      }
}

