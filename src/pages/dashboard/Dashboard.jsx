import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { visuallyHidden } from '@mui/utils';
import axios from 'axios';
import { getUserPosts } from '../../services/getPostByUserId';
import EditIcon from '@mui/icons-material/Edit';
import './dashboard.scss'
import { getAllCommentsByPostId } from '../../services/getAllCommentsByPostId';
import { deletePostById } from '../../services/deletePostById';
import Swal from 'sweetalert2';
import Modal from '../../components/modal/ModalEdit';
import ModalEdit from '../../components/modal/ModalEdit';
import PermanentDrawerLeft from '../navbar/NavbarLeft';
import { FaHome } from 'react-icons/fa';
import { BsFillPatchPlusFill } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { BiPhotoAlbum } from 'react-icons/bi';
import NavbarLeft from '../navbar/NavbarLeft';




function Dashboard() {

    const [userData, setUserData] = useState([]);
    const [commentsData, setCommentsData] = useState([]);

    const userId = 1;
    const postId = 1;




    useEffect(() => {

        getUserPosts(userId)
            .then((data) => {
                setUserData(data);
            })
            .catch((err) => {
                console.error(err);
            });

        getAllCommentsByPostId(postId)
            .then((data) => {
                setCommentsData(data);
                console.log(commentsData);
            })
            .catch((err) => {
                console.error(err);
            });


    }, []);




    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    function getComparator(order, orderBy) {
        return order === 'desc'
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) {
                return order;
            }
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }



    // function createData(title, calories, fat, carbs, protein) {
    //     return {
    //         title,
    //         calories,
    //         fat,
    //         carbs,
    //         protein,
    //     };
    // }






    // const initialRows = [
    //     createData('Cupcake', 305, 3.7, 67, 4.3),
    //     createData('Donut', 452, 25.0, 51, 4.9),
    //     createData('Eclair', 262, 16.0, 24, 6.0),
    //     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    //     createData('Gingerbread', 356, 16.0, 49, 3.9),
    //     createData('Honeycomb', 408, 3.2, 87, 6.5),
    //     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    //     createData('Jelly Bean', 375, 0.0, 94, 0.0),
    //     createData('KitKat', 518, 26.0, 65, 7.0),
    //     createData('Lollipop', 392, 0.2, 98, 0.0),
    //     createData('Marshmallow', 318, 0, 81, 2.0),
    //     createData('Nougat', 360, 19.0, 9, 37.0),
    //     createData('Oreo', 437, 18.0, 63, 4.0),
    // ];

    const headCells = [
        {
            id: 'title',
            numeric: false,
            disablePadding: true,
            label: 'Publicación',
        },
        {
            id: 'body',
            numeric: false,
            disablePadding: false,
            label: 'Descripción',
        },
        //   {
        //     id: 'fat',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Fat (g)',
        //   },
        //   {
        //     id: 'carbs',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Carbs (g)',
        //   },
        //   {
        //     id: 'protein',
        //     numeric: true,
        //     disablePadding: false,
        //     label: 'Protein (g)',
        //   },
    ];

    function EnhancedTableHead(props) {
        const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
            props;
        const createSortHandler = (property) => (event) => {
            onRequestSort(event, property);
        };

        return (
            <TableHead>
                <TableRow>
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={onSelectAllClick}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                    {headCells.map((headCell) => (
                        <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sortDirection={orderBy === headCell.id ? order : false}
                        >
                            <TableSortLabel
                                active={orderBy === headCell.id}
                                direction={orderBy === headCell.id ? order : 'asc'}
                                onClick={createSortHandler(headCell.id)}
                            >
                                {headCell.label}
                                {orderBy === headCell.id ? (
                                    <Box component="span" sx={visuallyHidden}>
                                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                    </Box>
                                ) : null}
                            </TableSortLabel>
                        </TableCell>
                    ))}
                    <TableCell />
                </TableRow>
            </TableHead>
        );
    }

    EnhancedTableHead.propTypes = {
        numSelected: PropTypes.number.isRequired,
        onRequestSort: PropTypes.func.isRequired,
        onSelectAllClick: PropTypes.func.isRequired,
        order: PropTypes.oneOf(['asc', 'desc']).isRequired,
        orderBy: PropTypes.string.isRequired,
        rowCount: PropTypes.number.isRequired,
    };

    function EnhancedTableToolbar(props) {
        const { numSelected } = props;


        const handleDelete = () => {

            Swal.fire({
                title: '¿Estás seguro de eliminar esta publicación?',
                text: "¡No podrás reversar está acción!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#D2E603',
                cancelButtonColor: '#2EC1AC',
                confirmButtonText: 'Si, Eliminar!'
            }).then((result) => {
                if (result.isConfirmed) {

                    const selectedRowData = userData.find((row) => selected.includes(row.title));
                    deletePostById(selectedRowData.id)
                        .then(() => {
                            const updatedUserData = userData.filter((row) => row.id !== selectedRowData.id);
                            setUserData(updatedUserData);
                        })
                        .catch((err) => {
                            console.error(err);
                        });
                    Swal.fire(
                        'Eliminada!',
                        '¡Tu publicación ha sido eliminada!',
                        'success'
                    )
                }
            })


        };

        const [open, setOpen] = React.useState(false);
        const [postToEdit, setPostToEdit] = useState('')
        //const handleOpen = () => setOpen(true);

        const handleEdit = () => {
            // Aquí puedes implementar la lógica para editar la fila seleccionada
            const selectedRowData = userData.find((row) => selected.includes(row.title));
            console.log('Editar:', selectedRowData);
            setPostToEdit(selectedRowData);
            setOpen(true);
        };




        return (
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                    ...(numSelected > 0 && {
                        bgcolor: (theme) =>
                            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                    }),
                }}
            >
                {numSelected > 0 ? (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        color="inherit"
                        variant="subtitle1"
                        component="div"
                    >
                        {numSelected} selected
                    </Typography>
                ) : (
                    <Typography
                        sx={{ flex: '1 1 100%' }}
                        variant="h6"
                        id="tableTitle"
                        component="div"
                    >
                        Mis Publicaciones
                    </Typography>
                )}

                {numSelected > 0 ? (
                    <Tooltip title="Delete">
                        <IconButton onClick={handleDelete}>
                            <span>Eliminar</span>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Filter list">
                        <IconButton>
                            <FilterListIcon />
                        </IconButton>
                    </Tooltip>
                )}
                {numSelected === 1 && ( // Mostrar el botón de editar solo si se selecciona exactamente una fila
                    <Tooltip title="Edit">
                        <IconButton onClick={handleEdit}>
                            <span>Editar</span>
                            <EditIcon />
                        </IconButton>

                        <ModalEdit open={open} setOpen={setOpen} postToEdit={postToEdit} />
                    </Tooltip>
                )}

            </Toolbar>
        );
    }

    EnhancedTableToolbar.propTypes = {
        numSelected: PropTypes.number.isRequired,
    };

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('calories');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const [expandedRow, setExpandedRow] = React.useState(null);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelected = userData?.map((n) => n.title);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, title) => {
        const selectedIndex = selected.indexOf(title);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, title);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (title) => selected.indexOf(title) !== -1;

    const [expandedRows, setExpandedRows] = useState({});

    const handleRowExpand = async (event, row) => {
        const newRowState = { ...expandedRows };
        newRowState[row.title] = !newRowState[row.title];
        setExpandedRows(newRowState);

        if (newRowState[row.title]) {
            try {
                const comments = await getAllCommentsByPostId(row.id);
                setCommentsData(comments);
            } catch (error) {
                console.error(error);
            }
        } else {
            setCommentsData([]);
        }
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userData.length) : 0;

    const visibleRows = stableSort(userData, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );


    const columns = [
        { id: 'comment', label: 'Email', minWidth: 200 },
        { id: 'description', label: 'Comentario', minWidth: 200 },
        { id: 'email', label: 'Descripción', minWidth: 200 },
    ];

    const listItems = [
        { icon: <FaHome />, text: 'Inicio' },
        { icon: <BsFillPatchPlusFill />, text: 'Publicar' },
        { icon: <CgProfile />, text: 'Perfil' },
        { icon: <BiPhotoAlbum />, text: 'Mi Galería' },
    ];



    return (
        <>
            <NavbarLeft listItems={listItems} />
            <div style={{ marginLeft: '200px', marginTop: '64px' }}>
                <Box sx={{ width: '95%' }}>
                    <Paper sx={{ width: '100%', mb: 2 }}>
                        {userData.length > 0 ? (
                            <div>
                                <EnhancedTableToolbar numSelected={selected.length} />
                                <TableContainer>
                                    <Table
                                        sx={{ minWidth: 750 }}
                                        aria-labelledby="tableTitle"
                                        size={dense ? 'small' : 'medium'}
                                    >
                                        <EnhancedTableHead
                                            numSelected={selected.length}
                                            order={order}
                                            orderBy={orderBy}
                                            onSelectAllClick={handleSelectAllClick}
                                            onRequestSort={handleRequestSort}
                                            rowCount={userData.length}
                                        />
                                        <TableBody>
                                            {visibleRows.map((row, index) => {
                                                const isItemSelected = isSelected(row.title);
                                                const labelId = `enhanced-table-checkbox-${index}`;
                                                const isRowExpanded = expandedRows[row.title];

                                                return (
                                                    <React.Fragment key={row.title}>
                                                        <TableRow
                                                            hover
                                                            onClick={(event) => handleClick(event, row.title)}
                                                            role="checkbox"
                                                            aria-checked={isItemSelected}
                                                            tabIndex={-1}
                                                            selected={isItemSelected}
                                                            sx={{ cursor: 'pointer' }}
                                                        >
                                                            <TableCell padding="checkbox">
                                                                <Checkbox
                                                                    color="primary"
                                                                    checked={isItemSelected}
                                                                    inputProps={{
                                                                        'aria-labelledby': labelId,
                                                                    }}
                                                                />
                                                            </TableCell>
                                                            <TableCell
                                                                component="th"
                                                                id={labelId}
                                                                scope="row"
                                                                padding="none"
                                                            >
                                                                {row.title}
                                                            </TableCell>
                                                            <TableCell align="right">{row.body}</TableCell>
                                                            <TableCell>
                                                                <IconButton
                                                                    aria-label="expand row"
                                                                    size="small"
                                                                    onClick={(event) => handleRowExpand(event, row)}
                                                                >
                                                                    {isRowExpanded ? (
                                                                        <>
                                                                            <span className='show__comments'>Ocultar comentarios</span>
                                                                            <KeyboardArrowUpIcon />
                                                                        </>
                                                                    ) : (
                                                                        <>
                                                                            <span className='show__comments'>Ver comentarios</span>
                                                                            <KeyboardArrowDownIcon />
                                                                        </>
                                                                    )}
                                                                </IconButton>
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell
                                                                style={{ paddingBottom: 0, paddingTop: 0 }}
                                                                colSpan={7}
                                                            >
                                                                <Collapse in={isRowExpanded} timeout="auto" unmountOnExit>
                                                                    <Box sx={{ width: '100%' }}>
                                                                        <Paper sx={{ width: '100%', mb: 2 }}>
                                                                            {commentsData.length > 0 ? (
                                                                                <TableContainer>
                                                                                    <Table aria-label="sticky table" size="medium">
                                                                                        <TableHead>
                                                                                            <TableRow>
                                                                                                {columns.map((column) => (
                                                                                                    <TableCell
                                                                                                        key={column.id}
                                                                                                        align="left"
                                                                                                        style={{ minWidth: column.minWidth }}
                                                                                                    >
                                                                                                        {column.label}
                                                                                                    </TableCell>
                                                                                                ))}
                                                                                            </TableRow>
                                                                                        </TableHead>
                                                                                        <TableBody>
                                                                                            {commentsData.map((row) => (
                                                                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                                                                    <TableCell align="left">{row.email}</TableCell>
                                                                                                    <TableCell align="left">{row.name}</TableCell>
                                                                                                    <TableCell align="left">{row.body}</TableCell>
                                                                                                </TableRow>
                                                                                            ))}
                                                                                        </TableBody>
                                                                                    </Table>
                                                                                </TableContainer>
                                                                            ) : (
                                                                                <div>Cargando...</div>
                                                                            )}
                                                                        </Paper>
                                                                    </Box>
                                                                </Collapse>
                                                            </TableCell>
                                                        </TableRow>
                                                    </React.Fragment>
                                                );
                                            })}
                                            {emptyRows > 0 && (
                                                <TableRow
                                                    style={{
                                                        height: (dense ? 33 : 53) * emptyRows,
                                                    }}
                                                >
                                                    <TableCell colSpan={7} />
                                                </TableRow>
                                            )}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25]}
                                    component="div"
                                    count={userData.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </div>
                        ) : (
                            <div>Cargando...</div>
                        )}
                    </Paper>
                </Box>
            </div>
        </>
    );
}

export default Dashboard;
