
export default (theme) => ({
    root: {
        display: 'flex',
        marginTop: '64px',
        background: '#ebebeb'
    },
    content: {
        flexGrow: 1,
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.sharp,
        //     duration: theme.transitions.duration.leavingScreen,
        // }),
        marginLeft: 0,
        boxSizing: 'border-box',
        minHeight: `calc(100vh - 64px)`,
    },
    contentShift: {
        // transition: theme.transitions.create('margin', {
        //     easing: theme.transitions.easing.easeOut,
        //     duration: theme.transitions.duration.enteringScreen,
        // }),
        marginLeft: 250,
    },
    noPadding: {
        padding: 0
    }
});