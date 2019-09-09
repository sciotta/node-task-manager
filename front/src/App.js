import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CheckCircle from '@material-ui/icons/CheckCircle';

import './App.css';
import { moveCandidates } from "./actions/actions";


const App = ({
 queueId,
 progress,
 completed,
 moveCandidates
}) => {
    const useStyles = makeStyles({
        card: {
            minWidth: 275,
        },
        subtitle: {
            fontSize: 14,
        },
        progress: {
            marginTop: 16,
        },
        check: {
            fontSize: 64,
            color: 'green',
        }
    });

    const classes = useStyles();

  return (
    <div className="App">
      <header className="App-header">
          { !queueId && <div>
              <Button variant="contained" color="primary" onClick={moveCandidates}>Mover candidatos</Button>
          </div> }

          { queueId && <Card className={classes.card}>
              <CardContent>
                  { !completed && <div>
                      <Typography variant="h6" component="h2">
                          Movendo candidatos...
                      </Typography>
                      <Typography className={classes.subtitle} color="textSecondary" gutterBottom>
                          {queueId}
                      </Typography>
                      <LinearProgress className={classes.progress} variant="determinate" value={progress} />
                  </div> }
                  { completed && <div>
                      <CheckCircle className={classes.check}/>
                      <Typography variant="h6" component="h2">
                          Candidatos movidos
                      </Typography>
                  </div> }
              </CardContent>
          </Card> }
      </header>
    </div>
  );
};

App.propTypes = {
    queueId: PropTypes.string,
    progress: PropTypes.number,
    moveCandidates: PropTypes.func,
};

const mapStateToProps = store => ({
    queueId: store.queue.queueId,
    progress: store.queue.progress,
    completed: store.queue.completed,
});

export default connect(mapStateToProps, {
    moveCandidates
})(App);
