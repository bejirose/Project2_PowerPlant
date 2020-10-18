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

sql2 = 'select "PLANT_NAME","PLANT_COUNTRY","PLANT_STATE","TYPE" FROM world_plant_list WHERE "TYPE" = %s and "PLANT_NAME" NOT LIKE %s ORDER BY "PLANT_DESIGN_CAPACITY_MWE" DESC FETCH FIRST 20 ROW ONLY'

cursor.execute(sql2, ("COAL","%(Shutdown)"))
coal_tables = cursor.fetchall()

cursor.execute(sql2, ("GAS","%(Decommissioned)"))
gas_tables = cursor.fetchall()

cursor.execute(sql2, ("OIL","%(Shutdown)"))
oil_tables = cursor.fetchall()

cursor.execute(sql2, ("HYDRO","%(Shutdown)"))
hydro_tables = cursor.fetchall()

cursor.execute(sql2, ("NUCLEAR","%(Shutdown)"))
nuclear_tables = cursor.fetchall()

cursor.execute(sql2, ("WIND","%(Shutdown)"))
wind_tables = cursor.fetchall()

cursor.execute(sql2, ("SOLAR_PV","%(Shutdown)"))
solar_tables = cursor.fetchall()

# Set route
@app.route('/')
def index():
    # Return the template with the teams list passed in
    return render_template('index.html')

@app.route('/top10_api')
def api():
    # Return the template with the teams list passed in
    return jsonify(records)

@app.route('/10us_new')
def us10_new():
    # Return the template with the teams list passed in
    return render_template('top10us.html', top10Rec=records)

@app.route('/coal')
def coal():
    # Return the template with the teams list passed in
    return render_template('coal.html', output_data=coal_tables)

@app.route('/gas')
def gas():
    # Return the template with the teams list passed in
    return render_template('gas.html', output_data=gas_tables)

@app.route('/oil')
def oil():
    # Return the template with the teams list passed in
    return render_template('oil.html', output_data=oil_tables)

@app.route('/hydro')
def hydro():
    # Return the template with the teams list passed in
    return render_template('hydro.html', output_data=hydro_tables)

@app.route('/nuclear')
def nuclear():
    # Return the template with the teams list passed in
    return render_template('nuclear.html', output_data=nuclear_tables)

@app.route('/wind')
def wind():
    # Return the template with the teams list passed in
    return render_template('wind.html', output_data=wind_tables)

@app.route('/solar')
def solar():
    # Return the template with the teams list passed in
    return render_template('solar.html', output_data=solar_tables)

#D3.json("/api_data");

if __name__ == "__main__":
    app.run(debug=True)

