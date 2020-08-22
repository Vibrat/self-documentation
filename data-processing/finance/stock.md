# Stock Analysis

#### Maths
##### Rolling window  analysis

Rolling-window analysis is used for:

* Checking the stability of model over time (most model assumes co-efficients are constant over time.
* Validate accuracy of a model.

Step tp perform Rolling-window:

* 1. Choose a rolling size
* 2. Choose a successive step increments (by default `1`). this mean we will divide our samples T in to `T-m+1` sub samples.
* 3. Run estimation | validation on thos samples.
* 4. Check there plot to see if there has been a relationship

#### Basics

* Fundamental metrics:

```python
# Close: Close Price
googl = data()
googl['Change'] = googl.Close.diff()
googl['Return'] = np.log(googl.Close).diff()
googl['Volatility'] = googl['Return'].rolling().std()
```
