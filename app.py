# 1. import Flask
from flask import Flask, render_template, redirect, jsonify
# 2. Create an app, being sure to pass __name__
app = Flask(__name__)


from sqlalchemy import create_engine
import psycopg2
from config import username, password
print(username)
print(password)

from sqlalchemy import create_engine
engine = create_engine(f'postgresql://{username}:{password}@localhost:5432/World_power_plant')
conn = engine.connect()
connection = psycopg2.connect(user = username,
                                  password = password,
                                  host = "localhost",
                                  port = "5432",
                                  database = "World_power_plant")
cursor = connection.cursor()

sql = 'select "PLANT_NAME", "PLANT_DESIGN_CAPACITY_MWE" from WORLD_PLANT_LIST where "PLANT_COUNTRY" = %s ORDER BY "PLANT_DESIGN_CAPACITY_MWE" DESC NULLS LAST LIMIT 10'

cursor.execute(sql, ("United States of America",))
records = cursor.fetchall()

# Set route
@app.route('/')
def index():
    # Return the template
    return render_template('index.html')

@app.route('/top10_api')
def api():
    # Return the template with the teams list passed in
    return jsonify(records)

@app.route('/10us_new')
def us10_new():
    # Return the template with the teams list passed in
    return render_template('top10us.html', top10Rec=records)

@app.route('/consumption')
def consumption():
    # Return the template
    return render_template('consumption.html')   

@app.route('/production')
def production():
    # Return the template
    return render_template('production.html')

@app.route('/production2')
def production2():
    # Return the template
    return render_template('production2.html')

@app.route('/fundamentals')
def fundamentals():
    # Return the template
    return render_template('fundamentals.html')

@app.route('/fundamentals_raw')
def fundamentals_raw():
    # Return the template
    return render_template('fundamentals_raw.html')

@app.route('/csvdata1')
def csvdata1():
    # Return the template
    return render_template('data/global-primary-energy.csv')

@app.route('/csvdata2')
def csvdata2():
    # Return the template
    return render_template('data/primary-energy-consumption-by-region.csv')

@app.route('/csvdata3')
def csvdata3():
    # Return the template
    return render_template('data/primary-energy-consumption-by-source.csv')

@app.route('/csvdata4')
def csvdata4():
    # Return the template
    return render_template('data/per-capita-energy-use.csv')

@app.route('/csvdata5')
def csvdata5():
    # Return the template
    return render_template('data/countries.json')

#D3.json("/api_data");

if __name__ == "__main__":
    app.run(debug=True)

