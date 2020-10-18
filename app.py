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

top10ussql = 'select "PLANT_NAME", "PLANT_DESIGN_CAPACITY_MWE" from WORLD_PLANT_LIST where "PLANT_COUNTRY" = %s ORDER BY "PLANT_DESIGN_CAPACITY_MWE" DESC NULLS LAST LIMIT 10'
cursor.execute(top10ussql, ("United States of America",))
top10USrecords = cursor.fetchall()

topustypesql = 'SELECT p."TYPE", MAX(p."PLANT_DESIGN_CAPACITY_MWE") AS max_mwe FROM WORLD_PLANT_LIST p \
    where p."PLANT_COUNTRY" = %s \
    GROUP BY p."TYPE" \
    ORDER BY max_mwe DESC'

cursor.execute(topustypesql, ("United States of America",))
topUSPlantTypeRec = cursor.fetchall()

topworldsql = 'select "TYPE", "PLANT_DESIGN_CAPACITY_MWE", "PLANT_NAME",  "PLANT_STATE" from WORLD_PLANT_LIST  \
    ORDER BY "PLANT_DESIGN_CAPACITY_MWE" DESC NULLS LAST LIMIT 10'
cursor.execute(topworldsql)
topWorldRec = cursor.fetchall()

countrysql = 'select "PLANT_COUNTRY", "TYPE", count(*) from WORLD_PLANT_LIST  \
    where "PLANT_COUNTRY" IS NOT NULL GROUP BY "TYPE", "PLANT_COUNTRY" '
cursor.execute(countrysql)
countryRec = cursor.fetchall()
#print(countryRec)

# Set route
@app.route('/')
def index():
    # Return the template with the teams list passed in
    return render_template('index.html')

@app.route('/top10us_data')
def top10us_data():
    # Return the template with the teams list passed in
    return render_template('top10us.html', top10Rec=top10USrecords)

@app.route('/top10us_api')
def top10us_api():
    # Return the template with the teams list passed in
    return jsonify(top10USrecords)

@app.route('/topusplanttype_data')
def topusplanttype_data():
    # Return the template with the teams list passed in
    return render_template('topusplanttype.html', top10Rec=topUSPlantTypeRec)

@app.route('/topusplanttype_api')
def topusplanttype_api():
    # Return the template with the teams list passed in
    return jsonify(topUSPlantTypeRec)

@app.route('/topworld_data')
def topworld_data():
    # Return the template with the teams list passed in
    return render_template('topworld.html', top10Rec=topWorldRec)

@app.route('/topworld_api')
def topworld_api():
    # Return the template with the teams list passed in
    return jsonify(topWorldRec)

@app.route('/country_data')
def country_data():
    # Return the template with the teams list passed in
    return render_template('country.html', top10Rec=countryRec)

@app.route('/country_api')
def country_api():
    # Return the template with the teams list passed in
    return jsonify(countryRec)

#D3.json("/api_data");

if __name__ == "__main__":
    app.run(debug=True)

