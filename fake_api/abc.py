def dfs(node, graph, visited, path, max_sum):
    # Mark the current node as visited
    visited[node] = True
    # Add the current node to the path
    path.append(node)

    # Check if a cycle is found
    if node in graph and len(path) > 1:
        cycle_sum = sum(path)
        if cycle_sum > max_sum[0]:
            max_sum[0] = cycle_sum

    # Recur for all the adjacent nodes
    if node in graph:
        for adjacent_node in graph[node]:
            if not visited[adjacent_node]:
                dfs(adjacent_node, graph, visited, path, max_sum)

    # Remove the current node from the path and mark it as unvisited
    path.remove(node)
    visited[node] = False

def largest_sum_cycle(num_cells, edges):
    graph = {}
    for i in range(num_cells):
        if edges[i] != -1:
            if edges[i] in graph:
                graph[edges[i]].append(i)
            else:
                graph[edges[i]] = [i]

    visited = [False] * num_cells
    max_sum = [-1]

    # Start DFS from each unvisited node
    for i in range(num_cells):
        if not visited[i]:
            dfs(i, graph, visited, [], max_sum)

    return max_sum[0]

# Read input from stdin
num_cells = int(input())
edges = list(map(int, input().split()))

# Call the function to find the largest sum cycle
result = largest_sum_cycle(num_cells, edges)

# Print the result
print(result)