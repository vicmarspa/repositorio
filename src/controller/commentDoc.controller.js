const DocumentoComment = require("../models/DocumentoComment");

const DocumentoCommentCtrl = {};




//insert rate

DocumentoCommentCtrl.commentDoc = async(req, res, next)=>{
  
    const documentoComment = new DocumentoComment({
        documentCommentDocId: req.body.documentCommentDocId,
        documentComment: req.body.documentComment,
        documentCommentUserId: req.userId,
      });
      await documentoComment.save();
}

//get rate


DocumentoCommentCtrl.getDocumentComment = async(req, res, next)=>{
  const { documentCommentDocId } = req.params;
  console.log('este es el id'+ documentCommentDocId);
  const documentComment = await DocumentoComment.find({ documentCommentDocId: { $eq: documentCommentDocId} });
  return res.json(documentComment)
}








module.exports = DocumentoCommentCtrl;