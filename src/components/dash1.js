import React, { useState, useRef, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import { Resizable } from 'react-resizable';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';


const ResponsiveGridLayout = WidthProvider( Responsive );

const FirstBox = ( { data } ) =>
{
    return (
        <Grid item xs={ 12 } sm={ 6 } lg={ 3 }>
            <Paper
                elevation={ 3 }
                sx={ {
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    background: data.Report.DailySale > 0 ? '#47FF84' : '#FF4081',
                    color: '#fff',
                    padding: '16px',
                } }
            >
                <div>
                    <Typography variant="h5" sx={ { fontWeight: 'bold' } }>
                        Total Earning
                    </Typography>
                    <Typography variant="h4" sx={ { fontWeight: 'bold', mt: 1 } }>
                        dskdkkds
                    </Typography>
                </div>
                <div sx={ { display: 'flex', alignItems: 'center', mt: 'auto' } }>
                    <TrendingUpIcon sx={ { fontSize: 30, mr: 1 } } />
                    <Typography variant="body2">Today's Earnings</Typography>
                </div>
            </Paper>
        </Grid>
    );
};

const Dashboard = ( { data } ) =>
{
    const colorPalette = [ '#8884d8', '#82ca9d', '#ff7300', '#00C49F', '#FFBB28', '#FF8042' ];
    const data1 = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 15 },
        // Add more data here...
    ];
    const data2 = [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 15 },
        // Add more data here...
    ];

    // Add data for other charts here...

    const layout = [
        { i: 'chart1', x: 0, y: 0, w: 2, h: 3 },
        { i: 'chart2', x: 2, y: 0, w: 2, h: 3 },
        { i: 'chart3', x: 0, y: 3, w: 4, h: 3 },
    ];

    const [ charts, setCharts ] = useState( layout );
    const resizableRefs = useRef( [] );

    useEffect( () =>
    {
        const resizeListener = () =>
        {
            // Force reflow to fix the chart size on window resize
            resizableRefs.current.forEach( ( ref ) =>
            {
                if ( ref.current )
                {
                    const { clientWidth, clientHeight } = ref.current;
                    setCharts( ( prevCharts ) =>
                        prevCharts.map( ( chart ) => ( {
                            ...chart,
                            w: Math.ceil( ( clientWidth - 20 ) / 300 ),
                            h: Math.ceil( ( clientHeight - 20 ) / 100 ),
                        } ) )
                    );
                }
            } );
        };

        window.addEventListener( 'resize', resizeListener );

        return () =>
        {
            window.removeEventListener( 'resize', resizeListener );
        };
    }, [] );

    const handleResize = ( index, event, { size } ) =>
    {
        setCharts( ( prevCharts ) =>
            prevCharts.map( ( chart, i ) =>
            {
                if ( i === index )
                {
                    return {
                        ...chart,
                        w: Math.ceil( ( size.width - 20 ) / 300 ),
                        h: Math.ceil( ( size.height - 20 ) / 100 ),
                    };
                }
                return chart;
            } )
        );
    };

    const onLayoutChange = ( newLayout ) =>
    {
        setCharts( newLayout );
    };

    return (
        <div>
            <Box component="main" sx={ { flexGrow: 1, py: 8, backgroundColor: '#F5F5F5' } }>
                <Container maxWidth="xl">
                    <Grid container spacing={ 3 }>
                        {/* First Box (Child component) */ }


                        {/* Add other chart boxes */ }
                    </Grid>
                </Container>
            </Box>
            <Box component="main" sx={ { flexGrow: 1, py: 8, backgroundColor: '#F5F5F5' } }>
                <Container maxWidth="xl">
                    <ResponsiveGridLayout
                        className="layout"
                        layouts={ { lg: charts } }
                        breakpoints={ { lg: 1200 } }
                        cols={ { lg: 4 } }
                        rowHeight={ 200 }
                        onLayoutChange={ onLayoutChange }
                    >

                        { charts.map( ( chart, index ) => (
                            <Grid
                                key={ chart.i }
                                item
                                xs={ 12 }
                                sm={ 6 }
                                lg={ chart.w }
                                sx={ { height: '100%' } }
                            >
                                <Paper
                                    elevation={ 3 }
                                    sx={ { height: '100%', display: 'flex', flexDirection: 'column' } }
                                >
                                    <Box
                                        sx={ {
                                            p: 3,
                                            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        } }
                                    >
                                        <div className="drag-handle">Drag Me</div>
                                        <div>Header Content</div>
                                    </Box>
                                    <Resizable
                                        ref={ ( ref ) => ( resizableRefs.current[ index ] = ref ) }
                                        className="resizable-content"
                                        width={ chart.w * 300 }
                                        height={ chart.h * 200 }
                                        minConstraints={ [ 200, 200 ] }
                                        maxConstraints={ [ 600, 600 ] }
                                        onResize={ ( event, size ) => handleResize( index, event, size ) }
                                        resizeHandles={ [ 'se' ] }
                                        handle={ <div className="resizable-handle" /> }
                                    >
                                        <div
                                            className="chart-content"
                                            style={ { flex: '1', overflow: 'hidden' } }
                                        >
                                            <ResponsiveContainer width="100%" height="100%">
                                                <BarChart
                                                    data={ index === 0 ? data1 : index === 1 }
                                                    margin={ { top: 20, right: 30, left: 20, bottom: 5 } }
                                                >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar
                                                        dataKey="value"
                                                        fill={ colorPalette[ index % colorPalette.length ] }
                                                    />
                                                </BarChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </Resizable>
                                </Paper>
                            </Grid>
                        ) ) }
                    </ResponsiveGridLayout>
                </Container>
            </Box>
        </div>
    );
};

export default Dashboard;
