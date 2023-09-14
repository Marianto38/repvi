import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Swal from 'sweetalert2';
import { createPost } from '../../services/createPost';

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


export default function ModalCreatePost({ open, setOpen }) {

    const handleClose = () => setOpen(false);

    const schema = yup
        .object({
            titlePost: yup.string().required(),
            bodyPost: yup.string().required(),
        })
        .required()


    // ************************ Constantes de Hook Form ************************

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
    })

    const onSubmit = (data) => {
        console.log(data)
        handleConfirmCreatePost(data)
    }

    //console.log(watch("bodyPost"))


    // ************************ Metodo submit para confirmar creación de post ************************


    const handleConfirmCreatePost = (postData) => {
        createPost(postData)
            .then((data) => {
                console.log(data);
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Publicación creada exitosamente!',
                    showConfirmButton: false,
                    timer: 1500
                });
                handleClose();
                reset(); // Restablece el formulario después de una creación exitosa
            })
            .catch((error) => {
                console.error(error);
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
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='container__edit__header'>
                                        <button className='container__edit__headerBtn' onClick={handleClose}>Cancelar</button>
                                        <h3>Crear Publicación</h3>
                                        <input type="submit" className='container__edit__headerBtn' />
                                    </div>
                                    <div className='container__edit__content'>
                                        <textarea
                                            placeholder="Título de publicación..."
                                            {...register("titlePost")}
                                            aria-invalid={errors.titlePost ? "true" : "false"}
                                            className="container__edit__inputPost"
                                            rows="3"
                                        ></textarea>
                                         {errors.titlePost && <small style={{color:'red'}}>El titulo de la publicación es requerido</small>}
                                 
                                        <textarea
                                            placeholder="Contenido de publicación..."
                                            {...register("bodyPost")}
                                            aria-invalid={errors.bodyPost ? "true" : "false"}
                                            className="container__edit__inputDescription"
                                            rows="8"
                                        ></textarea>
                                        {errors.bodyPost &&  <small style={{color:'red'}}>El contenido de la publicación es requerido</small>}

                                    </div>

                                </form>
                            </div>
                        </section>
                    </Box>
                </Fade>
            </Modal>
        </div >
    );
}