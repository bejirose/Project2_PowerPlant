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


#D3.json("/api_data");

if __name__ == "__main__":
    app.run(debug=True)

