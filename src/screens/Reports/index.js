import React, { Component } from 'react';
import { View, Header, Text, Picker } from 'native-base';
import { Image, TouchableOpacity, Dimensions } from 'react-native';
import { VictoryPie, VictoryChart, VictoryAxis, VictoryStack, VictoryBar } from "victory-native";
import { Col, Row } from 'react-native-easy-grid';
import { SQLite, DangerZone } from 'expo';

import Layouts from '../../constants/Layouts';
import Colors from '../../constants/Colors';
import NavBar from '../../components/NavBar';
import Loader from '../../components/Loader';

import styles from './styles';

const { Lottie } = DangerZone;
const {
  width: deviceWidth,
  height: deviceHeight,
} = Dimensions.get('window');
const categoryColor = [
  '#195380',
  '#A01664',
  '#85BA19',
  '#C87E1B',
  '#9e3e3e',
];

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      records: [],
    };
    this.navigation = props.navigation;
    this.ready = false;
    this.db = null;
  }

  componentDidMount() {
    this.db = SQLite.openDatabase('TTracking.db');
    this.db.transaction((tx) => {
      tx.executeSql(
        'select * from records;',
        [],
        (_, { rows: records }) => {
          this.ready = true;
          this.setState({ records: records._array });
        }
      );
    });
  }

  handleChange = (selected) => {
    this.setState({ selected });
  }

  renderContent = () => {
    const {
      records,
      selected,
    } = this.state;

    if (!this.ready) {
      return (
        <View style={Layouts.center}>
          <Loader />
        </View>
      );
    }

    if (records.length === 0) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Lottie
            style={{ width: 135, height: 135, alignSelf: 'center' }}
            source={require('../../../assets/animations/sad.json')}
          />
          <Text style={{ textAlign: 'center', fontSize: 16, color: 'dimgray', marginBottom: 10 }}>
            {`Parece que aún no tienes reportes\nvuelve cuando hayas medido algunas actividades`}
          </Text>

          <Button transparent style={{ alignSelf: 'center' }} onPress={() => this.navigation.goBack()}>
            <Text>
              Ok
            </Text>
          </Button>
        </View>
      );
    }

    const barChartData = [];
    const pieChartData = [];
    const pieChartColors = [];
    const categories = [];
    const unsanitisedCategories = records.map(({ category }) => category);
    records.forEach((record) => {
      const {
        creationTime: _creationTime,
        trackedTime: _trackedTime,
        category,
      } = record;

      const creationTime = new Date(_creationTime);
      const trackedTime = new Date(_trackedTime);

      const id = `${creationTime.getDate()}/${creationTime.getMonth()}/${creationTime.getFullYear()}`;

      const found = barChartData.findIndex((el) => {
        return el.id === id;
      });

      const current = {
        x: id,
        y: trackedTime.getTime(),
      }

      if (found !== -1) {
        // append to that existing section data
        barChartData[found].data.push(current);
      } else {
        // create the section
        barChartData.push({
          id,
          data: [current],
        });
      }
    });
    console.log(barChartData);
    unsanitisedCategories.forEach((_category) => {
      if (!categories.includes(_category)) {
        categories.push(_category);
      }
    });
    categories.forEach((category, index) => {
      const incidences = unsanitisedCategories.filter((_category) => _category === category);
      pieChartColors.push(Colors.categories[index] || '#9e3e3e');
      pieChartData.push({
        x: category,
        y: incidences.length,
      });
    });

    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0, alignItems: 'flex-end' }}>
          <Picker
            note
            mode="dropdown"
            selectedValue={selected}
            style={{ width: deviceWidth * 0.5, height: 40 }}
            onValueChange={this.handleChange}
          >
            <Picker.Item label="Último mes" value="LAST_MONTH" />
            <Picker.Item label="Último trimestre" value="LAST_THREE_MONTHS" />
            <Picker.Item label="Último semestre" value="LAST_SIX_MONTHS" />
            <Picker.Item label="Inicios de los tiempos" value="ALL" />
          </Picker>
        </View>

        <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 15, color: '#282828' }}>
          Actividades por categoria
        </Text>

        <View style={{ flex: 0 }}>
          <VictoryChart height={deviceHeight * 0.33}>
            <VictoryAxis
              tickFormat={() => ''}
              style={{
                axis: { stroke: "none" },
                tickLabels: { color: Colors.lightGray, fontSize: 0 }
              }}
            />
            <VictoryPie
              innerRadius={40}
              colorScale={pieChartColors}
              data={pieChartData}
            />
          </VictoryChart>
        </View>

        <Text style={{ marginTop: 5, marginLeft: 5, fontSize: 15, color: '#282828' }}>
          Duración por día
        </Text>

        <View style={{ flex: 0, marginBottom: 10 }}>
          <VictoryChart height={deviceHeight * 0.36} width={deviceWidth * 0.95}>
            <VictoryAxis
              style={{
                axis: { stroke: "none" },
                // tickLabels: { color: Colors.lightGray, fontSize: 0 }
              }}
            />
            <VictoryStack animate={{ duration: 1000 }} colorScale={categoryColor}>
              {
                barChartData.map(({ id, data }) => (
                  <VictoryBar
                    key={id}
                    data={data}
                  />
                ))
              }
            </VictoryStack>
          </VictoryChart>
        </View>

      </View>
    );
  }

  render() {
    return (
      <View style={Layouts.container}>
        <NavBar goBack title="Reportes" />

        <Col style={styles.content}>
          { this.renderContent() }
        </Col>
      </View>
    );
  }
}

export default Reports;
