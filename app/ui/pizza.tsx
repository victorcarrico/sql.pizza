'use client'

import { useRef } from 'react';
import { Button } from 'primereact/button';
import Editor from '@monaco-editor/react';
import { format } from 'sql-formatter';
import ThemeButton from './theme-button';

const defaultValue = `-- Select detailed sales report for each customer with their total purchase amount, the number of orders they have placed, and the average order value. Also include details about the top-selling product in each order.
SELECT c.customer_id, c.customer_name, c.email, SUM(o.total_amount) AS total_purchase_amount, COUNT(o.order_id) AS number_of_orders, AVG(o.total_amount) AS average_order_value, MAX(o.order_date) AS last_order_date, p.product_name AS top_selling_product, p.product_id AS top_selling_product_id, p.category AS top_selling_product_category, op.quantity AS top_selling_product_quantity
FROM customers c
INNER JOIN orders o ON c.customer_id = o.customer_id
INNER JOIN order_products op ON o.order_id = op.order_id
INNER JOIN products p ON op.product_id = p.product_id
WHERE o.order_date >= '2022-01-01' -- Filter orders from the year 2022
GROUP BY c.customer_id, c.customer_name, c.email, p.product_name, p.product_id, p.category, op.quantity
ORDER BY total_purchase_amount DESC, number_of_orders DESC;

-- Subquery to find customers who have spent more than the average total purchase amount and display their details along with their total spent amount.
SELECT c.customer_id, c.customer_name, c.email, c.phone_number, c.city, c.country, total_spent
FROM customers c
JOIN (SELECT customer_id, SUM(total_amount) AS total_spent FROM orders GROUP BY customer_id HAVING SUM(total_amount) > (SELECT AVG(total_amount) FROM orders)) t ON c.customer_id = t.customer_id
ORDER BY total_spent DESC;

-- Complex query involving window functions to calculate the running total of sales and the rank of each sale amount within each month.
SELECT o.order_id, o.order_date, o.customer_id, o.total_amount, SUM(o.total_amount) OVER (PARTITION BY DATE_TRUNC('month', o.order_date) ORDER BY o.order_date) AS running_total, RANK() OVER (PARTITION BY DATE_TRUNC('month', o.order_date) ORDER BY o.total_amount DESC) AS monthly_rank
FROM orders o
WHERE o.order_date BETWEEN '2022-01-01' AND '2022-12-31'
ORDER BY o.order_date;

-- Using a common table expression (CTE) to find the monthly sales total and then calculate the percentage contribution of each order to its respective month's total sales.
WITH monthly_sales AS (SELECT DATE_TRUNC('month', o.order_date) AS month, SUM(o.total_amount) AS monthly_total FROM orders o GROUP BY DATE_TRUNC('month', o.order_date))
SELECT o.order_id, o.order_date, o.customer_id, o.total_amount, ms.month, ms.monthly_total, (o.total_amount / ms.monthly_total) * 100 AS percentage_contribution
FROM orders o
JOIN monthly_sales ms ON DATE_TRUNC('month', o.order_date) = ms.month
WHERE o.order_date BETWEEN '2022-01-01' AND '2022-12-31'
ORDER BY o.order_date;

-- Nested subquery example to find products that have been ordered more than the average number of times.
SELECT p.product_id, p.product_name, p.category, p.price, order_count
FROM products p
JOIN (SELECT op.product_id, COUNT(op.order_id) AS order_count FROM order_products op GROUP BY op.product_id HAVING COUNT(op.order_id) > (SELECT AVG(order_count) FROM (SELECT COUNT(op.order_id) AS order_count FROM order_products op GROUP BY op.product_id) subquery)) t ON p.product_id = t.product_id
ORDER BY order_count DESC;
`

export default function Pizza() {
  const editorRef = useRef(null);
  const monacoRef = useRef(null);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    monacoRef.current = monaco;

    // Setting the theme
    import('monaco-themes/themes/Github Light.json')
        .then(data => {
          monaco.editor.defineTheme('github-light', data);
        })
        .then(_ => monaco.editor.setTheme('github-light'))
  }

  function beautifySQL() {
    editorRef.current.setValue(format(editorRef.current.getValue()));
  }

  function switchTheme(mode) {
    if (!monacoRef.current) return;

    if (mode === 'light') {
      import('monaco-themes/themes/Github Light.json')
      .then(data => {
        monacoRef.current.editor.defineTheme('github-light', data);
      })
      .then(_ => monacoRef.current.editor.setTheme('github-light'))
    } else {
      import('monaco-themes/themes/Github Dark.json')
      .then(data => {
        monacoRef.current.editor.defineTheme('github-dark', data);
      })
      .then(_ => monacoRef.current.editor.setTheme('github-dark'))
    }
  }

  return (
    <div className="main-container">
      <div className="editor-container">
        <Editor
          height="100%"
          defaultLanguage="sql"
          defaultValue={defaultValue}
          onMount={handleEditorDidMount}
          options={{
            minimap: {
              enabled: false,
            },
            theme: 'vs-dark',
            fontFamily: "Menlo, Consolas, 'Courier New', monospace",
            fontSize: 14,
            automaticLayout: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
      <div className="button-container">
        <Button label="Format SQL" onClick={beautifySQL} className="p-button-success" />
        <ThemeButton onModeChange={switchTheme}/>
      </div>
    </div>
  );
}
