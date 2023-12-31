import React, { useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import './modalEdit.scss'
import { editPostById } from '../../services/editPostById';
import Swal from 'sweetalert2';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function ModalEdit({ open, setOpen, postToEdit }) {

 // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [editedTitle, setEditedTitle] = useState('Cargando...');
  const [editedBody, setEditedBody] = useState('Cargando...');

  useEffect(() => {
    if (postToEdit) {
      setEditedTitle(postToEdit.title || '');
      setEditedBody(postToEdit.body || '');
    } else {
      setEditedTitle('Cargando...');
      setEditedBody('Cargando...');
    }
  }, [postToEdit]);

  const handleConfirmEditPost = () => {
    editPostById(postToEdit.id, editedTitle, editedBody)
    .then((data) => {
      console.log(data);
      handleClose(); 
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: '¡Publicación editada correctamente!',
        showConfirmButton: false,
        timer: 1500
      })
    })
    .catch((err) => {
      console.error(err);
    });
  }

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <section>
              <div className='container__edit'>
                <div className='container__edit__header'>
                  <button className='container__edit__headerBtn' onClick={handleClose}>Cancelar</button>
                  <h3>Editar Publicación</h3>
                  <button className='container__edit__headerBtn' onClick={handleConfirmEditPost}>Guardar</button>
                </div>
                <div className='container__edit__content'>
                  <textarea
                    type="text"
                    value={editedTitle}
                    className="container__edit__inputPost"
                    rows="3"
                    onChange={(e) => setEditedTitle(e.target.value)} 
                  ></textarea>
                  <textarea
                    type="text"
                    value={editedBody}
                    className="container__edit__inputDescription"
                    rows="8"
                    onChange={(e) => setEditedBody(e.target.value)} 
                  ></textarea>
                </div>
              </div>
            </section>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}