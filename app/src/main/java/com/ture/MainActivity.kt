package com.ture

import android.app.Activity
import android.graphics.Color
import android.os.Bundle
import android.view.Gravity
import android.view.View
import android.widget.ArrayAdapter
import android.widget.LinearLayout
import android.widget.Spinner
import android.widget.TextView
import java.time.LocalDate
import java.util.Locale

class MainActivity : Activity() {
    private lateinit var yearSpinner: Spinner
    private lateinit var monthSpinner: Spinner
    private lateinit var userSpinner: Spinner
    private lateinit var calendar: CalendarView
    private val preferences by lazy { getSharedPreferences("calendar", MODE_PRIVATE) }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        buildScreen()
    }

    private fun buildScreen() {
        val now = LocalDate.now()
        val root = LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(24, 20, 24, 16)
        }
        root.addView(TextView(this).apply {
            text = "Calendar ture"
            textSize = 28f
            setTextColor(Color.BLACK)
        })
        root.addView(TextView(this).apply {
            text = "Calendar pentru ture rotative"
            textSize = 18f
            setPadding(0, 0, 0, 16)
        })
        val controls = LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER_VERTICAL
        }
        yearSpinner = spinner((now.year..2037).toList().map(Int::toString), preferences.getInt("year", now.year).toString())
        monthSpinner = spinner((1..12).map { String.format(Locale.getDefault(), "%02d", it) },
            String.format(Locale.getDefault(), "%02d", preferences.getInt("month", now.monthValue)))
        userSpinner = spinner(
            listOf("Toți utilizatorii") + ShiftCalendar.users,
            preferences.getString("user", "Toți utilizatorii") ?: "Toți utilizatorii"
        )
        controls.addView(labelled("An", yearSpinner))
        controls.addView(labelled("Lună", monthSpinner))
        controls.addView(labelled("Utilizator", userSpinner), LinearLayout.LayoutParams(0, -2, 1f))
        root.addView(controls)
        calendar = CalendarView(this)
        root.addView(calendar, LinearLayout.LayoutParams(-1, -2))
        root.addView(legend())
        setContentView(root)
        val listener = object : android.widget.AdapterView.OnItemSelectedListener {
            override fun onNothingSelected(parent: android.widget.AdapterView<*>?) = Unit
            override fun onItemSelected(parent: android.widget.AdapterView<*>?, view: View?, position: Int, id: Long) {
                updateCalendar()
            }
        }
        yearSpinner.onItemSelectedListener = listener
        monthSpinner.onItemSelectedListener = listener
        userSpinner.onItemSelectedListener = listener
        updateCalendar()
    }

    private fun updateCalendar() {
        val year = yearSpinner.selectedItem?.toString()?.toIntOrNull() ?: return
        val month = monthSpinner.selectedItemPosition + 1
        val user = userSpinner.selectedItem?.toString().orEmpty()
            .takeUnless { it == "Toți utilizatorii" || it == "All users" }.orEmpty()
        preferences.edit().putInt("year", year).putInt("month", month).putString("user", user).apply()
        calendar.update(year, month, user)
    }

    private fun spinner(values: List<String>, selected: String): Spinner =
        Spinner(this).apply {
            adapter = ArrayAdapter(this@MainActivity, android.R.layout.simple_spinner_dropdown_item, values)
            setSelection(values.indexOf(selected).coerceAtLeast(0))
        }

    private fun labelled(title: String, control: View): LinearLayout =
        LinearLayout(this).apply {
            orientation = LinearLayout.VERTICAL
            addView(TextView(this@MainActivity).apply { text = title; textSize = 12f })
            addView(control)
            setPadding(0, 0, 8, 0)
        }

    private fun legend(): LinearLayout =
        LinearLayout(this).apply {
            orientation = LinearLayout.HORIZONTAL
            setPadding(0, 12, 0, 0)
            addView(TextView(this@MainActivity).apply { text = "Alb: Z/N sau liber   "; textSize = 15f })
            addView(TextView(this@MainActivity).apply { text = "Verde: zi  " ; textSize = 15f; setTextColor(Color.rgb(0, 130, 0)) })
            addView(TextView(this@MainActivity).apply { text = "Albastru: noapte"; textSize = 15f; setTextColor(Color.rgb(40, 40, 150)) })
        }
}
