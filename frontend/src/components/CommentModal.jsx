import React from 'react'

const CommentModal = () => {
  return (
    <>
    <button type="button" class="btn btn-primary" data-mdb-toggle="modal" data-mdb-target="#exampleModal">
              Launch demo modal
    </button>
    <div className="modal fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-mdb-dismiss="modal" aria-label="Close" />
      </div>
      <div className="modal-body">...</div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-mdb-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


    </>
  )
}

export default CommentModal