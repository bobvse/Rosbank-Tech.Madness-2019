package com.example.techmadness.core

import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.RecyclerView

abstract class BaseItemsAdapter<T : Any, VH : RecyclerView.ViewHolder>(
    protected val items: MutableList<T>
) : RecyclerView.Adapter<VH>() {

    abstract fun getDiffCallback(oldItems: List<T>, newItems: List<T>): DiffUtil.Callback

    fun updateItems(newItems: List<T>) {
        val diffResult = DiffUtil.calculateDiff(getDiffCallback(items, newItems))
        items.clear()
        items.addAll(newItems)
        diffResult.dispatchUpdatesTo(this)
    }
}