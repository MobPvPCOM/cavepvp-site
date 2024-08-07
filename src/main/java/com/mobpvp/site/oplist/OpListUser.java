package com.mobpvp.site.oplist;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.UUID;

/**
 * @author Moose1301
 * @date 8/7/2024
 */
@Data @AllArgsConstructor
public class OpListUser {
    private UUID uuid;
    private String name;
}
