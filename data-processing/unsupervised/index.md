# Unsupervised Machine Learning

## Difference between unsupervised and supervised learning

This important different is that with supervised learning, we have output at the beginning while in unsupervised learning, we do not have output. Therefore, the important thing to do for unsupervised learning is to find pattern based on input provided.

### Types of unsupervised learning

#### Cluster Analysis

**Definition**

```
Clustering is a technique that helps to find group that data belong to based on their input.

There are type type of clustering:

- Prototype-based clustering (K-mean nearest)
- Hierarchical and density-based clustering
```


Prepare data:

```
from sklearn.datasets import make_blobs
X, y = make_blobs(n_samples=150,
                  n_features=2,
                  centers=3,
                  cluster_std=0.5,
                  shuffle=True,
                  random_state=0)

import matplotlib.pyplot as plt
plt.scatter(X[:,0],
            X[:,1],
            c='white',
            marker='o',
            edgecolor='black',
            s=50)
plt.grid()
plt.show()
```

How K-mean works:

```
- Step 1: Random chose k centroid (centered points)
- Step 2: Assign samples to near centroids for grouping
- Step 3: Move centroids into the center of groups
- Step 4: Repeat Step 2 and 3 until samples are not moving between groups or tolerance is matched to limited criteria
```
