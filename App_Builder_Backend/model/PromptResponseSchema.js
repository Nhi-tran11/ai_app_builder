const mongoose = require('mongoose');

const promptResponseSchema = new mongoose.Schema(
  {
    appName: { type: String, required: true },
    roles: [
      {
        role: String,
        features: [
          {
            feature: String,
            entities: [
              { entity: String, 
                attributes: [String] 
            }
            ]
          }
        ]
      }
    ],
    emoji: { type: String, required: true },
    "--header-bg": { type: String, required: false },
    "--main-bg": { type: String, required: false }
  },
  { timestamps: true } 
);
module.exports = mongoose.model('PromptResponse', promptResponseSchema);